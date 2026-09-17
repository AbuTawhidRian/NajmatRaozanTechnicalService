import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { auth } from '@/auth';
import { existsSync } from 'fs';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/rateLimit';

// ── Constants ────────────────────────────────────────────────────────────────
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB per file
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Magic byte signatures for each allowed MIME type
const MAGIC_BYTES: Record<string, number[][]> = {
  'image/jpeg': [[0xff, 0xd8, 0xff]],
  'image/png':  [[0x89, 0x50, 0x4e, 0x47]],
  'image/webp': [[0x52, 0x49, 0x46, 0x46]], // "RIFF" — we also verify bytes 8-11 below
};

function detectMimeFromBuffer(buf: Buffer): string | null {
  for (const [mime, signatures] of Object.entries(MAGIC_BYTES)) {
    for (const sig of signatures) {
      if (sig.every((byte, i) => buf[i] === byte)) {
        // Extra check for WebP: bytes 8-11 must be "WEBP"
        if (mime === 'image/webp') {
          const webpMarker = [0x57, 0x45, 0x42, 0x50];
          if (!webpMarker.every((byte, i) => buf[8 + i] === byte)) continue;
        }
        return mime;
      }
    }
  }
  return null;
}

/** Resolve a public URL to an absolute path and assert it's inside uploadRoot. */
function safeResolvePath(publicUrl: string, uploadRoot: string): string | null {
  // Must start with the expected prefix
  if (!publicUrl.startsWith('/uploads/services/')) return null;
  // Strip any directory traversal sequences
  const normalized = path.normalize(publicUrl);
  const absolute = path.resolve(process.cwd(), 'public', normalized.replace(/^[\\/]/, ''));
  // Ensure the resolved path is still inside uploadRoot
  if (!absolute.startsWith(uploadRoot + path.sep) && absolute !== uploadRoot) return null;
  return absolute;
}

// ── POST — upload images ─────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Auth check
  const session = await auth();
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Rate limit: max 30 uploads per minute per IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  const { allowed } = checkRateLimit(`upload:${ip}`, 30, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many uploads. Please wait a moment.' }, { status: 429 });
  }

  const formData = await req.formData();
  const files = formData.getAll('file') as File[];

  if (!files || files.length === 0) {
    return NextResponse.json({ error: 'No files provided' }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'services');
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const uploadedUrls: string[] = [];

  for (const file of files) {
    // ── Size check ──────────────────────────────────────────────────────────
    if (file.size > MAX_FILE_SIZE_BYTES) {
      continue; // Skip oversized files
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ── Magic-byte MIME check (can't be spoofed unlike file.type) ───────────
    const detectedMime = detectMimeFromBuffer(buffer);
    if (!detectedMime || !ALLOWED_MIME_TYPES.includes(detectedMime)) {
      continue; // Skip files whose actual content doesn't match an allowed image type
    }

    // ── Write file ──────────────────────────────────────────────────────────
    // Use detected MIME to determine extension — never trust the original filename
    const extMap: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png':  'png',
      'image/webp': 'webp',
    };
    const ext = extMap[detectedMime] ?? 'jpg';
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const uploadPath = path.join(uploadDir, safeName);

    await writeFile(uploadPath, buffer);
    uploadedUrls.push(`/uploads/services/${safeName}`);
  }

  if (uploadedUrls.length === 0) {
    return NextResponse.json({ error: 'No valid images uploaded' }, { status: 400 });
  }

  return NextResponse.json({
    url: uploadedUrls[0],
    urls: uploadedUrls,
  });
}

// ── DELETE — remove an uploaded image ────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  // Auth check
  const session = await auth();
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Rate limit: max 60 deletes per minute per IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  const { allowed } = checkRateLimit(`delete:${ip}`, 60, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
  }

  try {
    const { url } = await req.json();

    // ── Path traversal prevention ────────────────────────────────────────────
    const uploadRoot = path.resolve(process.cwd(), 'public', 'uploads', 'services');
    const absolutePath = safeResolvePath(url, uploadRoot);
    if (!absolutePath) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    // ── Check if the URL is still in use in the database ────────────────────
    const inUse = await prisma.service.findFirst({
      where: {
        OR: [
          { imageUrl: url },
          { gallery: { has: url } },
        ],
      },
    });

    if (inUse) {
      return NextResponse.json({ success: true, message: 'URL is in use' });
    }

    if (existsSync(absolutePath)) {
      await unlink(absolutePath);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

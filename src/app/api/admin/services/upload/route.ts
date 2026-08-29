import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { auth } from '@/auth';
import { existsSync } from 'fs';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const files = formData.getAll('file') as File[];

  if (!files || files.length === 0) {
    return NextResponse.json({ error: 'No files provided' }, { status: 400 });
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const uploadedUrls: string[] = [];

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'services');
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  for (const file of files) {
    if (!allowedTypes.includes(file.type)) {
      continue; // Skip invalid files
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitise filename
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const uploadPath = path.join(uploadDir, safeName);

    await writeFile(uploadPath, buffer);
    uploadedUrls.push(`/uploads/services/${safeName}`);
  }

  if (uploadedUrls.length === 0) {
    return NextResponse.json({ error: 'No valid images uploaded' }, { status: 400 });
  }

  // Support both single file response and multiple files response for backward compatibility
  return NextResponse.json({ 
    url: uploadedUrls[0], 
    urls: uploadedUrls 
  });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { url } = await req.json();
    if (!url || !url.startsWith('/uploads/services/')) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const safePath = path.normalize(url).replace(/^(\.\.[\/\\])+/, '');
    const absolutePath = path.join(process.cwd(), "public", safePath);

    // Check if the URL is used in the database
    const inUse = await prisma.service.findFirst({
      where: {
        OR: [
          { imageUrl: url },
          { gallery: { has: url } }
        ]
      }
    });

    if (inUse) {
      return NextResponse.json({ success: true, message: "URL is in use" });
    }

    if (existsSync(absolutePath)) {
      await unlink(absolutePath);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

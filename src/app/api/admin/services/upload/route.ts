import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { auth } from '@/auth';
import { existsSync } from 'fs';

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

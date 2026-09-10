import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function GET(
  req: NextRequest, 
  { params }: { params: Promise<{ path: string[] }> | { path: string[] } }
) {
  // Resolve params for Next.js 15+ compatibility
  const resolvedParams = await params;
  const pathArray = resolvedParams.path;
  
  // Prevent directory traversal
  const safePathArray = pathArray.map(p => path.basename(p));
  const filePath = path.join(process.cwd(), 'public', 'uploads', ...safePathArray);

  if (!existsSync(filePath)) {
    return new NextResponse('File not found', { status: 404 });
  }

  try {
    const file = await readFile(filePath);
    
    // Determine content type
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    else if (ext === '.gif') contentType = 'image/gif';

    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return new NextResponse('Error reading file', { status: 500 });
  }
}

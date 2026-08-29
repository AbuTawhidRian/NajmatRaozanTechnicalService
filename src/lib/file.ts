import { unlink, readdir, stat } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import prisma from "./prisma";

/**
 * Safely deletes a file from the public directory given its public URL.
 * Example: "/uploads/services/123.jpg" -> deletes "public/uploads/services/123.jpg"
 */
export async function deleteLocalFile(publicUrl: string) {
  if (!publicUrl || !publicUrl.startsWith("/uploads/")) return;

  try {
    // Prevent directory traversal attacks
    const safePath = path.normalize(publicUrl).replace(/^(\.\.[\/\\])+/, '');
    const absolutePath = path.join(process.cwd(), "public", safePath);

    if (existsSync(absolutePath)) {
      await unlink(absolutePath);
      console.log(`Deleted file: ${absolutePath}`);
    }
  } catch (error) {
    console.error(`Failed to delete file ${publicUrl}:`, error);
  }
}

/**
 * Scans the uploads directory and deletes any files that are not referenced in the database
 * AND are older than 2 hours (to prevent deleting files currently being uploaded).
 */
export async function cleanupOrphanedFiles() {
  const uploadDir = path.join(process.cwd(), "public", "uploads", "services");
  if (!existsSync(uploadDir)) return;

  try {
    const files = await readdir(uploadDir);
    if (files.length === 0) return;

    // Fetch all active URLs from DB
    const services = await prisma.service.findMany({
      select: { imageUrl: true, gallery: true }
    });
    
    const activeUrls = new Set<string>();
    services.forEach(s => {
      if (s.imageUrl) activeUrls.add(s.imageUrl);
      if (s.gallery) s.gallery.forEach(url => activeUrls.add(url));
    });

    const now = Date.now();
    const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

    let deletedCount = 0;

    for (const file of files) {
      const filePath = path.join(uploadDir, file);
      const publicUrl = `/uploads/services/${file}`;

      if (!activeUrls.has(publicUrl)) {
        const fileStat = await stat(filePath);
        // If older than 2 hours and not in DB, delete it
        if (now - fileStat.mtimeMs > TWO_HOURS_MS) {
          await unlink(filePath);
          deletedCount++;
        }
      }
    }

    if (deletedCount > 0) {
      console.log(`Cleaned up ${deletedCount} orphaned files.`);
    }

  } catch (error) {
    console.error("Failed to cleanup orphaned files:", error);
  }
}

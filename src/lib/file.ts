import { unlink, readdir, stat } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import prisma from "./prisma";

/**
 * Safely deletes a file from the public directory given its public URL.
 * Example: "/uploads/projects/123.jpg" -> deletes "public/uploads/projects/123.jpg"
 */
export async function deleteLocalFile(publicUrl: string) {
  if (!publicUrl || !publicUrl.startsWith("/uploads/")) return;

  try {
    // Resolve to absolute path and assert it stays inside public/uploads/
    const normalized = path.normalize(publicUrl);
    const absolutePath = path.resolve(process.cwd(), "public", normalized.replace(/^[\\/]/, ""));
    const uploadRoot = path.resolve(process.cwd(), "public", "uploads");

    if (!absolutePath.startsWith(uploadRoot + path.sep)) {
      console.error(`Blocked path traversal attempt: ${publicUrl}`);
      return;
    }

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
  const uploadDir = path.join(process.cwd(), "public", "uploads", "projects");
  if (!existsSync(uploadDir)) return;

  try {
    const files = await readdir(uploadDir);
    if (files.length === 0) return;

    // Fetch all active URLs from DB
    const projects = await prisma.project.findMany({
      select: { imageUrl: true, gallery: true }
    });
    
    const activeUrls = new Set<string>();
    projects.forEach(p => {
      if (p.imageUrl) activeUrls.add(p.imageUrl);
      if (p.gallery) p.gallery.forEach(url => activeUrls.add(url));
    });

    const now = Date.now();
    const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

    let deletedCount = 0;

    for (const file of files) {
      const filePath = path.join(uploadDir, file);
      const publicUrl = `/uploads/projects/${file}`;

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

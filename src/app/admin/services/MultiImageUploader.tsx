"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";
import imageCompression from "browser-image-compression";

interface MultiImageUploaderProps {
  name: string;
  defaultUrls?: string[];
  label?: string;
}

export default function MultiImageUploader({ name, defaultUrls = [], label = "Gallery Images" }: MultiImageUploaderProps) {
  const [urls, setUrls] = useState<string[]>(defaultUrls);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUrls(defaultUrls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultUrls?.join(',')]);

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    const fd = new FormData();
    const compressionOptions = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      // Compress each file before appending
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressedFile = await imageCompression(file, compressionOptions);
        fd.append("file", compressedFile, compressedFile.name);
      }

      const res = await fetch("/api/admin/services/upload", { method: "POST", body: fd });
      const data = await res.json();
      
      if (data.urls) {
        setUrls((prev) => [...prev, ...data.urls]);
      } else if (data.url) {
        setUrls((prev) => [...prev, data.url]);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload images.");
    } finally {
      setUploading(false);
      // Reset input
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function removeUrl(indexToRemove: number) {
    const urlToRemove = urls[indexToRemove];
    setUrls((prev) => prev.filter((_, idx) => idx !== indexToRemove));

    // Delete immediately if it was uploaded just now (not an existing saved image)
    if (!defaultUrls.includes(urlToRemove)) {
      try {
        await fetch("/api/admin/services/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: urlToRemove }),
        });
      } catch (err) {
        console.error("Failed to delete orphaned image", err);
      }
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">{label}</label>

      {/* Upload Button */}
      <div
        onClick={() => fileRef.current?.click()}
        className="relative flex flex-col items-center justify-center gap-2 w-full py-8 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 hover:border-[#E59819] hover:bg-amber-50/30 cursor-pointer transition-colors"
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
            <span className="text-sm text-slate-500">Compressing and uploading...</span>
          </div>
        ) : (
          <>
            <Upload className="w-6 h-6 text-slate-400" />
            <span className="text-sm text-slate-600 font-medium">Click to select multiple images</span>
            <span className="text-xs text-slate-400">JPEG, PNG, or WebP. Auto-compressed before upload.</span>
          </>
        )}
        <input 
          ref={fileRef} 
          type="file" 
          accept="image/jpeg,image/png,image/webp" 
          multiple 
          className="hidden" 
          onChange={handleFiles} 
          disabled={uploading}
        />
      </div>

      {/* Hidden Fields for form submission */}
      {urls.map((url, idx) => (
        <input key={idx} type="hidden" name={name} value={url} />
      ))}

      {/* Preview Grid */}
      {urls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
          {urls.map((url, idx) => (
            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group">
              <Image src={url} alt={`Gallery image ${idx + 1}`} fill className="object-cover" unoptimized />
              <button
                type="button"
                onClick={() => removeUrl(idx)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

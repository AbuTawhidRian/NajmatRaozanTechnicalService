"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  name: string;
  defaultUrl?: string;
  label?: string;
}

export default function ImageUploader({ name, defaultUrl = "", label = "Service Image" }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(defaultUrl);
  const [urlInput, setUrlInput] = useState<string>(defaultUrl);
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<"url" | "upload">("url");
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // Delete previously uploaded image if it exists and is not the default
    if (preview && preview !== defaultUrl && preview.startsWith("/uploads/")) {
      try {
        await fetch("/api/admin/services/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: preview }),
        });
      } catch (err) {
        console.error("Failed to delete previous image", err);
      }
    }

    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/services/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (data.url) {
      setPreview(data.url);
      setUrlInput(data.url);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">{label}</label>

      {/* Toggle */}
      <div className="flex rounded-lg border border-slate-200 overflow-hidden text-xs font-medium w-fit">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`px-3 py-1.5 transition-colors ${mode === "url" ? "bg-[#0A2540] text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}
        >
          Paste URL
        </button>
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`px-3 py-1.5 transition-colors ${mode === "upload" ? "bg-[#0A2540] text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}
        >
          Upload File
        </button>
      </div>

      {mode === "url" ? (
        <input
          type="text"
          value={urlInput}
          onChange={(e) => { setUrlInput(e.target.value); setPreview(e.target.value); }}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#E59819]/40 focus:border-[#E59819]"
        />
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          className="relative flex flex-col items-center justify-center gap-2 w-full h-24 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 hover:border-[#E59819] hover:bg-amber-50/30 cursor-pointer transition-colors"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
              <span className="text-xs text-slate-500">Uploading image...</span>
            </div>
          ) : (
            <>
              <Upload className="w-5 h-5 text-slate-400" />
              <span className="text-xs text-slate-400">Click to upload JPEG / PNG / WebP</span>
            </>
          )}
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFile} />
        </div>
      )}

      {/* Hidden field carries the final URL for the form action */}
      <input type="hidden" name={name} value={urlInput} />

      {/* Preview */}
      {preview && (
        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200 mt-1">
          <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
          <button
            type="button"
            onClick={async () => {
              if (preview && preview !== defaultUrl && preview.startsWith("/uploads/")) {
                try {
                  await fetch("/api/admin/services/upload", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: preview }),
                  });
                } catch (err) {
                  console.error("Failed to delete image", err);
                }
              }
              setPreview("");
              setUrlInput("");
            }}
            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}

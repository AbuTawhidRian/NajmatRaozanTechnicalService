"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import react-quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface RichTextEditorProps {
  name: string;
  defaultValue?: string;
}

export default function RichTextEditor({ name, defaultValue = "" }: RichTextEditorProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <>
      <input type="hidden" name={name} value={value} />
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <ReactQuill 
          theme="snow" 
          value={value} 
          onChange={setValue} 
          className="h-48 mb-12"
        />
      </div>
    </>
  );
}

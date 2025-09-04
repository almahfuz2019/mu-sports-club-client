// components/editor/index.tsx
"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useMemo } from "react";
import MenuBar from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  // ✅ Memoize extensions
  const extensions = useMemo(
    () => [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
    ],
    []
  );

  const editor = useEditor({
    extensions,
    content, // ✅ use initial content directly
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-b-xs py-3 px-3 outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // ✅ Update editor if content changes externally
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false); // false = don’t emit onUpdate again
    }
  }, [editor, content]);

  if (!editor) return null; // ✅ avoid rendering until editor is ready

  return (
    <div className="mt-1">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

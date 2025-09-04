"use client";

import React, { useMemo } from "react";
import { Editor } from "@tiptap/react";
import { Toggle } from "../ui/toggle";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
  Undo2,
  Redo2,
  Quote,
  Pilcrow,
  Link as LinkIcon,
  Link2Off,
} from "lucide-react";

interface Option {
  icon: React.ReactNode;
  onClick: () => void;
  pressed: boolean;
}

export default function MenuBar({ editor }: { editor: Editor | null }) {
  // Hooks must be called before early return
  const headingIcons = [
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
  ];

  const headingOptions = useMemo(() => {
    return [1, 2, 3, 4, 5, 6].map((level) => {
      const IconComponent = headingIcons[level - 1];
      return {
        icon: <IconComponent className="size-4" />,
        onClick: () => editor?.chain().focus().toggleHeading({ level: level as any }).run(),
        pressed: editor?.isActive("heading", { level }) ?? false,
      };
    });
  }, [editor]);

  const options: Option[] = useMemo(() => {
    if (!editor) return [];

    return [
      // Undo / Redo
      {
        icon: <Undo2 className="size-4" />,
        onClick: () => editor.chain().focus().undo().run(),
        pressed: false,
      },
      {
        icon: <Redo2 className="size-4" />,
        onClick: () => editor.chain().focus().redo().run(),
        pressed: false,
      },

      // Headings
      ...headingOptions,

      // Paragraph
      {
        icon: <Pilcrow className="size-4" />,
        onClick: () => editor.chain().focus().setParagraph().run(),
        pressed: editor.isActive("paragraph"),
      },

      // Links
      {
        icon: <LinkIcon className="size-4" />,
        onClick: () => {
          const url = window.prompt("Enter URL");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        },
        pressed: editor.isActive("link"),
      },
      {
        icon: <Link2Off className="size-4" />,
        onClick: () => editor.chain().focus().unsetLink().run(),
        pressed: false,
      },

      // Text formatting
      {
        icon: <Bold className="size-4" />,
        onClick: () => editor.chain().focus().toggleBold().run(),
        pressed: editor.isActive("bold"),
      },
      {
        icon: <Italic className="size-4" />,
        onClick: () => editor.chain().focus().toggleItalic().run(),
        pressed: editor.isActive("italic"),
      },
      {
        icon: <Underline className="size-4" />,
        onClick: () => editor.chain().focus().toggleMark("underline").run(),
        pressed: editor.isActive("underline"),
      },
      {
        icon: <Strikethrough className="size-4" />,
        onClick: () => editor.chain().focus().toggleStrike().run(),
        pressed: editor.isActive("strike"),
      },
      {
        icon: <Highlighter className="size-4" />,
        onClick: () => editor.chain().focus().toggleHighlight().run(),
        pressed: editor.isActive("highlight"),
      },

      // Alignment
      {
        icon: <AlignLeft className="size-4" />,
        onClick: () => editor.chain().focus().setTextAlign("left").run(),
        pressed: editor.isActive({ textAlign: "left" }),
      },
      {
        icon: <AlignCenter className="size-4" />,
        onClick: () => editor.chain().focus().setTextAlign("center").run(),
        pressed: editor.isActive({ textAlign: "center" }),
      },
      {
        icon: <AlignRight className="size-4" />,
        onClick: () => editor.chain().focus().setTextAlign("right").run(),
        pressed: editor.isActive({ textAlign: "right" }),
      },

      // Lists
      {
        icon: <List className="size-4" />,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        pressed: editor.isActive("bulletList"),
      },
      {
        icon: <ListOrdered className="size-4" />,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        pressed: editor.isActive("orderedList"),
      },

      // Other blocks
      {
        icon: <Quote className="size-4" />,
        onClick: () => editor.chain().focus().toggleBlockquote().run(),
        pressed: editor.isActive("blockquote"),
      },
      {
        icon: <Code className="size-4" />,
        onClick: () => editor.chain().focus().toggleCodeBlock().run(),
        pressed: editor.isActive("codeBlock"),
      },
    ];
  }, [editor, headingOptions]);

  // Early return after hooks
  if (!editor) return null;

  return (
    <div className="border-t border-x rounded-t-sm p-2 bg-slate-50 flex flex-wrap gap-1 z-50">
      {options.map((option, idx) => (
        <Toggle
          key={idx}
          pressed={option.pressed}
          onPressedChange={option.onClick}
        >
          <span className="cursor-pointer">{option.icon}</span>
        </Toggle>
      ))}
    </div>
  );
}

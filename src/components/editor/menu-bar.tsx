"use client";

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
} from "lucide-react";
import { Editor } from "@tiptap/react";
import React from "react";
import { Toggle } from "../ui/toggle";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const headingOptions = [
    { level: 1, icon: <Heading1 className="size-4" /> },
    { level: 2, icon: <Heading2 className="size-4" /> },
    { level: 3, icon: <Heading3 className="size-4" /> },
    { level: 4, icon: <Heading4 className="size-4" /> },
    { level: 5, icon: <Heading5 className="size-4" /> },
    { level: 6, icon: <Heading6 className="size-4" /> },
  ];

  const options = [
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
    ...headingOptions.map(({ level, icon }) => ({
      icon,
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleHeading({ level: level as any })
          .run(),
      pressed: editor.isActive("heading", { level }),
    })),
    {
      icon: <Pilcrow className="size-4" />,
      onClick: () => editor.chain().focus().setParagraph().run(),
      pressed: editor.isActive("paragraph"),
    },
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

  return (
    <div className="border-t border-x rounded-t-sm p-2  bg-slate-50 flex flex-wrap gap-1 z-50">
      {options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.pressed}
          onPressedChange={option.onClick}
        >
          <span className="cursor-pointer"> {option.icon}</span>
        </Toggle>
      ))}
    </div>
  );
}

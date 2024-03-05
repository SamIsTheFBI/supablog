'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { Link as TipTapLink } from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { ChangeEvent, useCallback, useState } from 'react';
import { Button } from '../ui/button';
import { CodeIcon, FontBoldIcon, FontItalicIcon, ImageIcon, ListBulletIcon, QuoteIcon, RulerSquareIcon, StrikethroughIcon, UnderlineIcon } from '@radix-ui/react-icons';
import { LuListOrdered, LuRedo, LuStrikethrough, LuUndo } from 'react-icons/lu';
import Underline from '@tiptap/extension-underline'
import { RiChatNewLine, RiFontMono } from "react-icons/ri";
import { VscNewline } from "react-icons/vsc";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import { addTodo } from '@/server/actions/todoActions';

export default function Tiptap() {
  const [selectedHeading, setSelectedHeading] = useState('0');
  const [editorContent, setEditorContent] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Underline,
      TipTapLink.configure({
        openOnClick: false,
        autolink: true,
      })
    ],
    content: 'Start writing here..',
    onUpdate({ editor }) {
      setEditorContent(editor.getHTML());
      console.log(editorContent)
    },
  })

  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <>
      <div className="flex items-center gap-x-3 gap-y-2 flex-wrap border-b pb-2">
        <Button variant="ghost" onClick={addImage}><ImageIcon /></Button>
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'border border-secondary-foreground bg-secondary' : ''}
        >
          <FontBoldIcon />
        </Button>
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'border border-secondary-foreground bg-secondary' : ''}
        >
          <FontItalicIcon />
        </Button>
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'border border-secondary-foreground bg-secondary' : ''}
        >
          <LuStrikethrough />
        </Button>
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'border border-secondary-foreground bg-secondary' : ''}
        >
          <UnderlineIcon />
        </Button>
        <Button variant="ghost"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          Normal
        </Button>
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'border border-secondary-foreground bg-secondary' : ''}
        >
          h1
        </Button>
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'border border-secondary-foreground bg-secondary' : ''}
        >
          h2
        </Button>
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'border border-secondary-foreground bg-secondary' : ''}
        >
          h3
        </Button>
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'border border-secondary-foreground bg-secondary' : ''}
        >
          h4
        </Button>
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? 'border border-secondary-foreground bg-secondary' : ''}
        >
          h5
        </Button>
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? 'border border-secondary-foreground bg-secondary' : ''}
        >
          h6
        </Button>
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'border border-secondary-foreground bg-secondary' : ''}
        >
          <ListBulletIcon />
        </Button>
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'border border-secondary-foreground bg-secondary' : ''}
        >
          <LuListOrdered />
        </Button>
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'border border-secondary-foreground bg-secondary' : ''}
        >
          <CodeIcon />
        </Button>
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'border border-secondary-foreground bg-secondary' : ''}
        >
          <QuoteIcon />
        </Button>
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          <LuUndo />
        </Button>
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <LuRedo />
        </Button>
      </div>


      <EditorContent editor={editor} />
      <Button disabled={editorContent === ''} onClick={() => addTodo(editorContent)}>Submit</Button>
    </>
  )
}

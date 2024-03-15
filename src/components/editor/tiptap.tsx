'use client'

import { BubbleMenu, useEditor, EditorContent } from '@tiptap/react'
import { Link as TipTapLink } from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useEffect, useState } from 'react';
import Underline from '@tiptap/extension-underline'

import EditorMenu from './menu'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button';
import { Textarea } from '../ui/textarea'
import { useFormStatus } from 'react-dom'
import { publishAction, updatePost } from '@/server/actions/blogActions'
import { AuthSession } from '@/server/auth/utils'
import { toast } from 'sonner'
import { InsertBlogs } from '@/server/db/schema/blog'
import { useEditorContentStore } from '@/store/editorContent'
import { useSubmitToggleStore } from '@/store/canSubmit'

export type EditorProps = {
  session: AuthSession,
  blogObj?: InsertBlogs,
}

export default function Tiptap({ session, blogObj }: EditorProps) {
  const { editorContent, setEditorContent } = useEditorContentStore()
  const { setCanSubmit } = useSubmitToggleStore()
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
    onCreate({ editor }) {
      setEditorContent(editor.getHTML())
    },
    content: blogObj?.content || '',
    onUpdate({ editor }) {
      let canUndo = editor.can().chain().focus().undo().run()
      setEditorContent(editor.getHTML());
      setCanSubmit(canUndo)
    },
  })

  if (!editor) {
    return null
  }

  return (
    <>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100, maxWidth: '678px', placement: 'auto-start', }}>
        <EditorMenu editor={editor} />
      </BubbleMenu>

      <article className="px-4 h-full">
        <EditorContent editor={editor} />
      </article>
    </>
  )
}

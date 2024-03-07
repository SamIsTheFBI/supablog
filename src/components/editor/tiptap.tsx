'use client'

import { BubbleMenu, useEditor, EditorContent } from '@tiptap/react'
import { Link as TipTapLink } from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useState } from 'react';
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
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { Textarea } from '../ui/textarea'
import { useFormStatus } from 'react-dom'
import { publishAction } from '@/server/actions/blogActions'
import { addTodo } from '@/server/actions/todoActions'
import { AuthSession } from '@/server/auth/utils'

export default function Tiptap(session: AuthSession) {
  const { pending } = useFormStatus();

  const formSchema = z.object({
    title: z.string().min(5),
    slug: z.string().min(5),
    description: z.string().min(5),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    () => new Promise(resolve => setTimeout(resolve, 5000))
    const authorId = session.session?.user.id as string

    const blogObj = {
      title: values.title,
      slug: values.slug,
      description: values.description,
      content: editorContent,
      isDraft: false,
      authorId: authorId,
    }

    console.log(blogObj)

    publishAction(blogObj)
  }

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
    content: '',
    onUpdate({ editor }) {
      setEditorContent(editor.getHTML());
      console.log(editorContent)
    },
  })

  if (!editor) {
    return null
  }

  return (
    <>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          bold
        </button>
      </BubbleMenu>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex items-baseline gap-x-3 justify-between">
                <FormLabel>Title</FormLabel>
                <div className="w-full space-y-1">
                  <FormControl>
                    <Input placeholder="Title of your blog post" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="flex items-baseline gap-x-3 justify-between">
                <FormLabel>Slug</FormLabel>
                <div className="w-full space-y-1">
                  <FormControl>
                    <Input placeholder="This will show in URL of your blog post" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex items-baseline gap-x-3 justify-between">
                <FormLabel>Description</FormLabel>
                <div className="w-full space-y-1">
                  <FormControl>
                    <Textarea placeholder="A brief description of your blog post" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <EditorMenu editor={editor} />
          <EditorContent editor={editor} />
          <Button disabled={pending || editorContent === '' || editorContent === '<p></p>'} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}

"use client"

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

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { useForm } from "react-hook-form"
import { useFormStatus } from "react-dom";
import { AuthSession } from "@/server/auth/utils";
import { InsertBlogs } from "@/server/db/schema/blog";
import { toast } from "sonner";
import { publishAction, updatePost } from "@/server/actions/blogActions";
import { useEditorContentStore } from "@/store/editorContent";
import { useSubmitToggleStore } from "@/store/canSubmit";
import { Label } from "../ui/label";
import { UploadButton } from "./uploadthing";
import Image from "next/image";
import { useState } from "react";

export type MetadataFormProps = {
  session: AuthSession,
  blogObj?: InsertBlogs,
}

export default function MetadataForm({ session, blogObj }: MetadataFormProps) {
  const { editorContent, setEditorContent } = useEditorContentStore()
  const { canSubmit, setCanSubmit } = useSubmitToggleStore()
  const { pending } = useFormStatus();

  const formSchema = z.object({
    title: z.string().min(5),
    slug: z.string().min(5),
    description: z.string().min(5),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blogObj?.title || "",
      slug: blogObj?.slug || "",
      description: blogObj?.description || "",
    }
  })

  function slugify(title: string) {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    form.setValue('slug', slug, { shouldValidate: true })
  }

  let update = false
  if (blogObj?.slug) {
    update = true
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const authorId = session.session?.user.id as string

    const blogObj = {
      title: values.title,
      slug: values.slug,
      description: values.description,
      content: editorContent,
      isDraft: false,
      authorId: authorId,
      coverImage: imageUrl,
    }

    let error
    if (update) {
      const actualBlogObj = { ...blogObj, updatedAt: new Date() }
      error = await updatePost(actualBlogObj)
    } else {
      const actualBlogObj = { ...blogObj, createdAt: new Date(), updatedAt: new Date() }
      error = await publishAction(actualBlogObj)
    }

    if (error?.error) {
      toast.error(error.error)
      return
    }

    if (update) {
      toast.success("Blog post updated successfully!")
    } else {
      toast.success("Blog post published successfully!")
    }
  }

  const [imageUrl, setImageUrl] = useState('')

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex flex-col justify-between h-full">
          <div className="space-y-3">
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
                <FormItem>
                  <div className="flex items-baseline gap-x-3 justify-between">
                    <FormLabel>Slug</FormLabel>
                    <div className="flex gap-2 w-full max-sm:flex-wrap">
                      <FormControl>
                        <Input placeholder="This will show in URL of your blog post" {...field} />
                      </FormControl>
                      <Button type="button" onClick={() => slugify(form.getValues('title'))}>Generate Slug</Button>
                    </div>
                  </div>
                  <FormMessage />
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
            <FormField
              control={form.control}
              name="description"
              render={() => (
                <FormItem className="flex items-baseline gap-x-3">
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <UploadButton
                      className="mt-4 ut-button:bg-primary ut-button:text-sm ut-button:ut-readying:bg-primary ut-button:ut-uploading:bg-primary"
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        console.log("Files: ", res);
                        setImageUrl(res[0].url)
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center w-full gap-2">
              {imageUrl !== '' &&
                <Image
                  src={imageUrl}
                  alt="cover image"
                  height={352}
                  width={360}
                  className="aspect-video h-56 p-2 bg-secondary rounded-md border object-cover"
                />
              }
            </div>
          </div>
          <div className="space-x-2">
            <Button disabled={pending || !canSubmit || editorContent === '' || editorContent === '<p></p>'} type="submit">
              {update && 'Update' || 'Submit'}
            </Button>
            <Button variant="secondary" disabled={pending || !canSubmit || editorContent === '' || editorContent === '<p></p>'} type="button">
              TODO: Save as draft
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

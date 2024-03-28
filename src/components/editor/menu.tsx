import { Editor } from "@tiptap/react";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { CodeIcon, FontBoldIcon, FontItalicIcon, ImageIcon, ListBulletIcon, QuoteIcon, UnderlineIcon } from "@radix-ui/react-icons";
import { LuHeading1, LuListOrdered, LuRedo, LuStrikethrough, LuUndo } from "react-icons/lu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LuLink } from 'react-icons/lu'
import { Input } from "@/components/ui/input"
import { UploadButton } from "./uploadthing";
import { FaBold, FaCode, FaImage, FaItalic, FaListOl, FaListUl, FaQuoteLeft, FaRedo, FaRedoAlt, FaStrikethrough, FaUnderline, FaUndo } from "react-icons/fa";


export default function EditorMenu({ editor }: { editor: Editor }) {

  return (
    <div className="flex items-center gap-x-3 gap-y-2 flex-wrap border rounded-md shadow-sm p-2 bg-background z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
          >
            <FaImage />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-y-4">
            <Input
              type="text"
              placeholder="Enter image URL..."
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  const url = (event.target as HTMLInputElement).value
                  if (url && url !== '')
                    editor?.chain().focus().setImage({ src: url }).run()
                }
              }}
            />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            <UploadButton
              className="my-ut"
              endpoint="imageUploader"
              onClientUploadComplete={async (res) => {
                if (res[0].url) {
                  editor?.chain().focus().setImage({ src: res[0].url }).run()
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'text-primary bg-secondary' : ''}
      >
        <FaBold />
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'text-primary bg-secondary' : ''}
      >
        <FaItalic />
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'text-primary bg-secondary' : ''}
      >
        <FaStrikethrough />
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'text-primary bg-secondary' : ''}
      >
        <FaUnderline />
      </Button>
      <Button type="button" variant="ghost"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        Normal
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'text-primary bg-secondary' : ''}
      >
        <span className="font-extrabold">h1</span>
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'text-primary bg-secondary' : ''}
      >
        <span className="font-extrabold">h2</span>
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'text-primary bg-secondary' : ''}
      >
        <span className="font-extrabold">h3</span>
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'text-primary bg-secondary' : ''}
      >
        <span className="font-extrabold">h4</span>
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'text-primary bg-secondary' : ''}
      >
        <span className="font-extrabold">h5</span>
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'text-primary bg-secondary' : ''}
      >
        <span className="font-extrabold">h6</span>
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'text-primary bg-secondary' : ''}
      >
        <FaListUl />
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'text-primary bg-secondary' : ''}
      >
        <FaListOl />
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'text-primary bg-secondary' : ''}
      >
        <FaCode />
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'text-primary bg-secondary' : ''}
      >
        <FaQuoteLeft />
      </Button>
      <Button type="button"
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
        <FaUndo />
      </Button>
      <Button type="button"
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
        <FaRedo />
      </Button>
    </div>
  )
}

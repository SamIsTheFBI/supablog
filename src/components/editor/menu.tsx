import { Editor } from "@tiptap/react";
import { useCallback } from "react";
import { Button } from "../ui/button";
import { CodeIcon, FontBoldIcon, FontItalicIcon, ImageIcon, ListBulletIcon, QuoteIcon, UnderlineIcon } from "@radix-ui/react-icons";
import { LuListOrdered, LuRedo, LuStrikethrough, LuUndo } from "react-icons/lu";


export default function EditorMenu({ editor }: { editor: Editor }) {
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
    <div className="flex items-center gap-x-3 gap-y-2 flex-wrap border rounded-md shadow-sm pb-2">
      <Button type="button" variant="ghost" onClick={addImage}><ImageIcon /></Button>
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
        className={editor.isActive('bold') ? 'border border-secondary-foreground bg-secondary' : ''}
      >
        <FontBoldIcon />
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
        className={editor.isActive('italic') ? 'border border-secondary-foreground bg-secondary' : ''}
      >
        <FontItalicIcon />
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
        className={editor.isActive('strike') ? 'border border-secondary-foreground bg-secondary' : ''}
      >
        <LuStrikethrough />
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'border border-secondary-foreground bg-secondary' : ''}
      >
        <UnderlineIcon />
      </Button>
      <Button type="button" variant="ghost"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        Normal
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'border border-secondary-foreground bg-secondary' : ''}
      >
        h1
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'border border-secondary-foreground bg-secondary' : ''}
      >
        h2
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'border border-secondary-foreground bg-secondary' : ''}
      >
        h3
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'border border-secondary-foreground bg-secondary' : ''}
      >
        h4
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'border border-secondary-foreground bg-secondary' : ''}
      >
        h5
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'border border-secondary-foreground bg-secondary' : ''}
      >
        h6
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'border border-secondary-foreground bg-secondary' : ''}
      >
        <ListBulletIcon />
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'border border-secondary-foreground bg-secondary' : ''}
      >
        <LuListOrdered />
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'border border-secondary-foreground bg-secondary' : ''}
      >
        <CodeIcon />
      </Button>
      <Button type="button"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'border border-secondary-foreground bg-secondary' : ''}
      >
        <QuoteIcon />
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
        <LuUndo />
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
        <LuRedo />
      </Button>
    </div>
  )
}

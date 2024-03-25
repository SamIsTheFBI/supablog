import { PluginKey } from "@tiptap/pm/state";
import { CommandProps, Editor, Extension } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion"

export const CmdPluginKey = new PluginKey('cmdKey')

const cmdMenu = Extension.create({
  name: 'cmd',
  addOptions() {
    return {
      HTMLAttributes: {},
      suggestion: {
        char: '/',
        pluginKey: CmdPluginKey,
        command: ({ editor, range, props }) => {

        }
      }
    }
  }
})

const commandMenu = Extension.create({
  name: "commandMenu",
  addProseMirrorPlugins() {
    return [
      Suggestion<CommandProps>({
        editor: this.editor,
        char: "/",
        command: ({ editor, range, props }) => {
        },
        items: ({ query }) => {
          return (
            [
              {
                title: "Heading",
                attrs: {
                  "data-test-id": "insert-heading1",
                },
                command: ({ editor }: { editor: Editor }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .setNode("heading", { level: 1 })
                    .run();
                }
              },
              {
                title: "Subheading",
                attrs: {
                  "data-test-id": "insert-heading2",
                },
                command: ({ editor }: { editor: Editor }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .setNode("heading", { level: 2 })
                    .run();
                },
              },
              {
                title: "Quote",
                attrs: {
                  "data-test-id": "insert-quote",
                },
                command: ({ editor, range }: { editor: Editor, range: { from: number; to: number } }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .setBlockquote()
                    .run();
                },
              },
              {
                title: "Bullet List",
                attrs: {
                  "data-test-id": "insert-bullet-list",
                },
                command: ({ editor, range }: { editor: Editor, range: { from: number; to: number } }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .toggleBulletList()
                    .run();
                },
              },
              {
                title: "Numbered List",
                attrs: {
                  "data-test-id": "insert-ordered-list",
                },
                command: ({ editor, range }: { editor: Editor, range: { from: number; to: number } }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .toggleOrderedList()
                    .run();
                },
              },
              {
                title: "Image",
                attrs: {
                  "data-test-id": "insert-image",
                },
                command: ({ editor, range }: { editor: Editor, range: { from: number; to: number } }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .insertContentAt(from, { type: "imagePlaceholder" })
                    .run();
                },
              },
            ] as CommandProps[]
          )
        }
      })
    ]
  }
})

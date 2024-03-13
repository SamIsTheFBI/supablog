import { create } from "zustand"

type EditorContentStore = {
  editorContent: string;
  setEditorContent: (text: string) => void;
}

export const useEditorContentStore = create<EditorContentStore>((set) => ({
  editorContent: '',
  setEditorContent: (text) => set({ editorContent: text })
}))

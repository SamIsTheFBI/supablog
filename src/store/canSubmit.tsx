import { create } from "zustand"

type SubmitToggleStore = {
  canSubmit: boolean;
  setCanSubmit: (canSubmit: boolean) => void;
}

export const useSubmitToggleStore = create<SubmitToggleStore>((set) => ({
  canSubmit: false,
  setCanSubmit: (canSubmit) => set({ canSubmit: canSubmit })
}))


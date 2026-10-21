import { create } from 'zustand'

interface IntroState {
  // Abertura pedida de novo pelo botão "Rever abertura"
  replayOpen: boolean
  replay: () => void
  close: () => void
}

export const useIntroStore = create<IntroState>((set) => ({
  replayOpen: false,
  replay: () => set({ replayOpen: true }),
  close: () => set({ replayOpen: false }),
}))

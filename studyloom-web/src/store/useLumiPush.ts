import { create } from 'zustand'

interface PushState {
  message: string
  visible: boolean
  show: (message: string) => void
  hide: () => void
}

let hideTimer: number | undefined

// Banner de notificação da Lumi. Qualquer tela chama show('mensagem').
export const useLumiPush = create<PushState>((set) => ({
  message: '',
  visible: false,
  show: (message) => {
    window.clearTimeout(hideTimer)
    set({ message, visible: true })
    hideTimer = window.setTimeout(() => set({ visible: false }), 5200)
  },
  hide: () => {
    window.clearTimeout(hideTimer)
    set({ visible: false })
  },
}))
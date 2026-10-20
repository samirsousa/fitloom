import { create } from 'zustand'
import { MAX_STREAK_FREEZES, STREAK_FREEZE_COST } from '../data/wardrobe'

export type Theme = 'dark' | 'light'

export const HEART_REFILL_COST = 100
export const MAX_HEARTS = 5

interface GameState {
  userName: string
  // Carreira-alvo. A Etapa 4 (onboarding) passa a gravar este campo.
  career: string
  streak: number
  lastStudyDay: string | null
  hearts: number
  totalXp: number
  dailyXp: number
  dailyXpGoal: number
  isPro: boolean
  theme: Theme
  chestOpened: boolean
  streakFreezes: number
  // Histórico de respostas para a taxa de acerto do Perfil
  answeredTotal: number
  correctTotal: number
  toggleTheme: () => void
  claimChest: () => boolean
  addXp: (amount: number) => void
  spendXp: (amount: number) => boolean
  loseHeart: () => void
  recordAnswer: (correct: boolean) => void
  completeBattery: () => void
  refillHeartsWithXp: () => boolean
  buyStreakFreeze: () => boolean
}

// Valores iniciais iguais aos do protótipo. Na Fase 1 isso passa a vir do backend.
export const useGameStore = create<GameState>((set, get) => ({
  userName: 'Concurseiro',
  career: 'Tribunais & MP',
  streak: 14,
  lastStudyDay: null,
  hearts: MAX_HEARTS,
  totalXp: 1420,
  dailyXp: 35,
  dailyXpGoal: 50,
  isPro: false,
  theme: 'dark',
  chestOpened: false,
  streakFreezes: 0,
  answeredTotal: 0,
  correctTotal: 0,

  toggleTheme: () =>
    set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

  claimChest: () => {
    if (get().chestOpened) return false
    set((s) => ({
      chestOpened: true,
      totalXp: s.totalXp + 50,
      dailyXp: Math.min(s.dailyXpGoal, s.dailyXp + 15),
    }))
    return true
  },

  addXp: (amount) =>
    set((s) => ({
      totalXp: s.totalXp + amount,
      dailyXp: Math.min(s.dailyXpGoal, s.dailyXp + amount),
    })),

  // Compras com XP. Reduz o total e, portanto, a posição na liga.
  spendXp: (amount) => {
    if (get().totalXp < amount) return false
    set((s) => ({ totalXp: s.totalXp - amount }))
    return true
  },

  loseHeart: () =>
    set((s) => (s.isPro ? s : { hearts: Math.max(0, s.hearts - 1) })),

  recordAnswer: (correct) =>
    set((s) => ({
      answeredTotal: s.answeredTotal + 1,
      correctTotal: s.correctTotal + (correct ? 1 : 0),
    })),

  // A ofensiva sobe no máximo uma vez por dia
  completeBattery: () =>
    set((s) => {
      const today = new Date().toLocaleDateString('sv-SE')
      if (s.lastStudyDay === today) return s
      return { streak: s.streak + 1, lastStudyDay: today }
    }),

  refillHeartsWithXp: () => {
    const { isPro, hearts, spendXp } = get()
    if (isPro || hearts >= MAX_HEARTS) return false
    if (!spendXp(HEART_REFILL_COST)) return false
    set({ hearts: MAX_HEARTS })
    return true
  },

  // O consumo do congelamento na virada de dia entra na Etapa 6
  buyStreakFreeze: () => {
    const { streakFreezes, spendXp } = get()
    if (streakFreezes >= MAX_STREAK_FREEZES) return false
    if (!spendXp(STREAK_FREEZE_COST)) return false
    set((s) => ({ streakFreezes: s.streakFreezes + 1 }))
    return true
  },
}))
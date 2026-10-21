import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MAX_STREAK_FREEZES, STREAK_FREEZE_COST } from '../data/wardrobe'
import type { ProPlanId } from '../data/proPlans'
import { DEFAULT_CAREER_ID, type CareerId } from '../data/careers'
import { DEFAULT_DAILY_XP_GOAL } from '../data/dailyGoals'
import { daysBetween, localDay, yesterday } from '../utils/day'
import { persistOptions } from './persistence'

export type Theme = 'dark' | 'light'

export const HEART_REFILL_COST = 100
export const MAX_HEARTS = 5

interface GameData {
  userName: string
  // Carreira-alvo escolhida no onboarding. Rótulo e módulo vêm de src/data/careers.ts.
  careerId: CareerId
  onboardingCompleted: boolean
  streak: number
  lastStudyDay: string | null
  // Último dia em que o app foi aberto, para as renovações diárias (meta, baú, vidas)
  lastActiveDay: string | null
  hearts: number
  totalXp: number
  dailyXp: number
  dailyXpGoal: number
  isPro: boolean
  proPlan: ProPlanId | null
  theme: Theme
  // Um único controle para sons e vibração
  soundEnabled: boolean
  // Baú do dia já resgatado. Renova na virada do dia.
  chestOpened: boolean
  streakFreezes: number
  // Histórico de respostas para a taxa de acerto do Perfil
  answeredTotal: number
  correctTotal: number
}

interface GameActions {
  toggleTheme: () => void
  toggleSound: () => void
  claimChest: () => boolean
  addXp: (amount: number) => void
  spendXp: (amount: number) => boolean
  loseHeart: () => void
  recordAnswer: (correct: boolean) => void
  completeBattery: () => void
  refillHeartsWithXp: () => boolean
  buyStreakFreeze: () => boolean
  activatePro: (plan: ProPlanId) => void
  cancelPro: () => void
  completeOnboarding: (data: { userName: string; careerId: CareerId; dailyXpGoal: number }) => void
  skipOnboarding: () => void
  // Renovações da virada do dia. Retorna true quando um congelamento salvou a ofensiva.
  syncDay: () => boolean
  resetProgress: () => void
}

type GameState = GameData & GameActions

// Usuário novo começa do zero. Na Fase 1 isso passa a vir do backend.
const initialGameData: GameData = {
  userName: 'Concurseiro',
  careerId: DEFAULT_CAREER_ID,
  onboardingCompleted: false,
  streak: 0,
  lastStudyDay: null,
  lastActiveDay: null,
  hearts: MAX_HEARTS,
  totalXp: 0,
  dailyXp: 0,
  dailyXpGoal: DEFAULT_DAILY_XP_GOAL,
  isPro: false,
  proPlan: null,
  theme: 'dark',
  soundEnabled: true,
  chestOpened: false,
  streakFreezes: 0,
  answeredTotal: 0,
  correctTotal: 0,
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialGameData,

      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),

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
          const today = localDay()
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

      // O congelamento é consumido em syncDay, quando falta exatamente um dia de estudo
      buyStreakFreeze: () => {
        const { streakFreezes, spendXp } = get()
        if (streakFreezes >= MAX_STREAK_FREEZES) return false
        if (!spendXp(STREAK_FREEZE_COST)) return false
        set((s) => ({ streakFreezes: s.streakFreezes + 1 }))
        return true
      },

      // Assinatura simulada. TODO backend: ativar só após a confirmação do pagamento.
      activatePro: (plan) => set({ isPro: true, proPlan: plan }),
      cancelPro: () => set({ isPro: false, proPlan: null }),

      // Rever a abertura e concluir de novo só troca nome, carreira e meta. XP e ofensiva ficam.
      completeOnboarding: ({ userName, careerId, dailyXpGoal }) =>
        set((s) => ({
          userName,
          careerId,
          dailyXpGoal,
          dailyXp: Math.min(s.dailyXp, dailyXpGoal),
          onboardingCompleted: true,
        })),
      skipOnboarding: () => set({ onboardingCompleted: true }),

      syncDay: () => {
        const s = get()
        const today = localDay()
        const patch: Partial<GameData> = {}
        let freezeUsed = false

        // Novo dia: meta diária zera, baú renova e vidas recarregam.
        // TODO backend: vidas recarregadas por tempo no servidor.
        if (s.lastActiveDay !== today) {
          Object.assign(patch, { lastActiveDay: today, dailyXp: 0, chestOpened: false, hearts: MAX_HEARTS })
        }

        // Ofensiva: hoje ou ontem mantém; faltou um dia, o congelamento salva; mais que isso, zera
        if (s.lastStudyDay && s.streak > 0) {
          const gap = daysBetween(s.lastStudyDay, today)
          if (gap === 2 && s.streakFreezes > 0) {
            Object.assign(patch, { streakFreezes: s.streakFreezes - 1, lastStudyDay: yesterday() })
            freezeUsed = true
          } else if (gap >= 2) {
            patch.streak = 0
          }
        }

        if (Object.keys(patch).length > 0) set(patch)
        return freezeUsed
      },

      // Volta ao estado de usuário novo, inclusive o onboarding. Tema e som são preferências e ficam.
      resetProgress: () =>
        set((s) => ({
          ...initialGameData,
          theme: s.theme,
          soundEnabled: s.soundEnabled,
          lastActiveDay: localDay(),
        })),
    }),
    persistOptions<GameState>('game'),
  ),
)
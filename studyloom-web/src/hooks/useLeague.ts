import { useMemo } from 'react'
import { PROMOTION_SLOTS, rivals } from '../data/leagueRivals'
import { useGameStore } from '../store/useGameStore'

export interface LeagueEntry {
  id: string
  name: string
  avatar: string
  xp: number
  streak: number
  accuracy?: number
  isPro: boolean
  isMe: boolean
}

export function rankMedal(rank: number) {
  return ['🥇', '🥈', '🥉'][rank - 1] ?? String(rank)
}

export function useLeague() {
  const userName = useGameStore((s) => s.userName)
  const totalXp = useGameStore((s) => s.totalXp)
  const streak = useGameStore((s) => s.streak)
  const isPro = useGameStore((s) => s.isPro)

  return useMemo(() => {
    const me: LeagueEntry = {
      id: 'me',
      name: userName,
      avatar: '⚡',
      xp: totalXp,
      streak,
      isPro,
      isMe: true,
    }
    const others: LeagueEntry[] = rivals.map((r) => ({
      ...r,
      isPro: Boolean(r.isPro),
      isMe: false,
    }))

    const entries = [...others, me].sort((a, b) => b.xp - a.xp)
    const myRank = entries.findIndex((e) => e.isMe) + 1
    const cutoffXp = entries[PROMOTION_SLOTS - 1].xp
    const xpToPromotion = myRank <= PROMOTION_SLOTS ? 0 : cutoffXp - totalXp + 1

    return { entries, myRank, xpToPromotion }
  }, [userName, totalXp, streak, isPro])
}
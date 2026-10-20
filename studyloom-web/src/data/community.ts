export interface CommunityItem {
  id: string
  friend: string
  avatar: string
  title: string
  detail: string
  tone: 'orange' | 'emerald' | 'muted'
  actionLabel: string
}

// Dados de exemplo. Quando houver backend, isso vem da API.
export const communityItems: CommunityItem[] = [
  {
    id: 'marina',
    friend: 'Marina',
    avatar: '🦊',
    title: 'Você & Marina (Dupla de Edital)',
    detail: '🔥 14 dias resolvendo questões todos os dias sem falhar!',
    tone: 'orange',
    actionLabel: '👋 Incentivar',
  },
  {
    id: 'lucas',
    friend: 'Lucas',
    avatar: '⚖️',
    title: 'Lucas gabaritou a bateria de "Direito Constitucional"',
    detail: '⚡ Bônus de Tempo 2x XP conquistado • Há 10 min',
    tone: 'emerald',
    actionLabel: '🎉 Parabenizar',
  },
  {
    id: 'camila',
    friend: 'Camila',
    avatar: '📚',
    title: 'Camila desbloqueou a insígnia "Mestre da Lei Seca"',
    detail: '🏅 50 questões de Art. 5º CF/88 resolvidas sem erro',
    tone: 'muted',
    actionLabel: '👏 Celebrar',
  },
]

export const toneStyles = {
  orange: { color: 'var(--orange-400)', fontWeight: 800 },
  emerald: { color: 'var(--emerald-400)', fontWeight: 700 },
  muted: { color: 'var(--text-secondary)', fontWeight: 700 },
} as const
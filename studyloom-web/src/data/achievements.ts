// De onde vem o progresso de cada conquista
export type AchievementProgress =
  | { type: 'streak'; goal: number }
  // TODO backend: progresso de exemplo até existir histórico de respostas por matéria
  | { type: 'sample'; current: number; goal: number }

export interface Achievement {
  id: string
  medal: string
  title: string
  desc: string
  progress: AchievementProgress
}

export const achievements: Achievement[] = [
  {
    id: 'lei-seca',
    medal: '⚖️',
    title: 'Mestre da Lei Seca',
    desc: 'Acertou 50 questões seguidas de Direito Constitucional e Administrativo.',
    progress: { type: 'sample', current: 50, goal: 50 },
  },
  {
    id: '100-dias',
    medal: '🔥',
    title: '100 Dias de Edital',
    desc: 'Resolva baterias diárias com a Lumi 3D até a data da sua prova.',
    progress: { type: 'streak', goal: 100 },
  },
]

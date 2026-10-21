export interface DailyGoal {
  xp: number
  icon: string
  title: string
  desc: string
}

// Meta em XP, porque o app não mede tempo de estudo.
// Uma bateria com todos os acertos rende 60 XP, ou até 120 XP com o bônus 2x.
export const dailyGoals: DailyGoal[] = [
  {
    xp: 30,
    icon: '⏱️',
    title: 'Leve • 30 XP/dia',
    desc: 'Cerca de meia bateria por dia para manter a chama acesa.',
  },
  {
    xp: 60,
    icon: '🔥',
    title: 'Consistente • 60 XP/dia',
    desc: 'Cerca de uma bateria por dia, com revisão no Caderno de Erros.',
  },
  {
    xp: 120,
    icon: '🚀',
    title: 'Intensa • 120 XP/dia',
    desc: 'Cerca de duas baterias por dia para disputar o topo da liga.',
  },
]

// Meta de quem pula o onboarding: a opção Consistente
export const DEFAULT_DAILY_XP_GOAL = 60

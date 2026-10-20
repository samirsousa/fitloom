import { LEAGUE_NAME } from './leagueRivals'

export type TrailAction =
  | { type: 'quiz'; index: number }
  | { type: 'chest' }
  | { type: 'route'; to: string }

export interface TrailNode {
  id: string
  pos: 'center' | 'left' | 'right' | 'far-left'
  kind: 'nutrition' | 'workout' | 'chest' | 'locked'
  icon: string
  ariaLabel: string
  caption: string
  action: TrailAction
  active?: boolean
}

export const trailNodes: TrailNode[] = [
  {
    id: 'portugues',
    pos: 'center',
    kind: 'nutrition',
    icon: '📚',
    ariaLabel: 'Língua Portuguesa: Crase e Regência',
    caption: '📚 Português: Crase & Regência ⭐⭐⭐',
    action: { type: 'quiz', index: 0 },
  },
  {
    id: 'constitucional',
    pos: 'left',
    kind: 'workout',
    icon: '⚖️',
    ariaLabel: 'Direito Constitucional: Art. 5º CF/88',
    caption: '⚖️ Dir. Constitucional: Art. 5º ⭐⭐⭐',
    action: { type: 'quiz', index: 1 },
  },
  {
    id: 'raciocinio',
    pos: 'center',
    kind: 'workout',
    icon: '🧠',
    ariaLabel: 'Bateria atual: Raciocínio Lógico e Constitucional',
    caption: '🔥 Raciocínio Lógico & Bancas',
    action: { type: 'quiz', index: 0 },
    active: true,
  },
  {
    id: 'bau',
    pos: 'right',
    kind: 'chest',
    icon: '🎁',
    ariaLabel: 'Baú de Súmulas Vinculantes',
    caption: '🎁 Baú do Aprovado (+50 XP)',
    action: { type: 'chest' },
  },
  {
    id: 'administrativo',
    pos: 'far-left',
    kind: 'nutrition',
    icon: '🏛️',
    ariaLabel: 'Direito Administrativo: Atos e Poderes',
    caption: '🏛️ Dir. Administrativo & Flashcards',
    action: { type: 'route', to: '/erros' },
  },
  {
    id: 'simulado',
    pos: 'center',
    kind: 'locked',
    icon: '🏆',
    ariaLabel: 'Simulado geral do edital',
    caption: '🔒 Simulado FGV / Cebraspe',
    action: { type: 'quiz', index: 2 },
  },
]

// A última fala usa a posição real do usuário na liga
export function lumiTrailSpeeches(myRank: number) {
  return [
    '"Responda rápido p/ ganhar 2x XP! ⚡"',
    '"Art. 5º da CF/88 despenca em prova! ⚖️"',
    '"Abra o Baú do Aprovado (+50 XP)! 🎁"',
    `"Você está em #${myRank} na ${LEAGUE_NAME}! 🏆"`,
  ]
}
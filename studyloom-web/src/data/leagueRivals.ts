export interface Rival {
  id: string
  name: string
  avatar: string
  xp: number
  streak: number
  accuracy?: number
  isPro?: boolean
}

// Escada de ligas por cargo: Técnico, Analista, Auditor e Magistratura.
// O usuário está na Liga Auditor. Na Fase 2 a liga atual vem do backend.
// Nome da divisão, usado sozinho no card de liga do Perfil
export const LEAGUE_TIER = 'Auditor'
export const LEAGUE_NAME = `Liga ${LEAGUE_TIER}`
export const NEXT_LEAGUE_NAME = 'Liga Magistratura'
export const LEAGUE_WEEK = 14
// Quantos concurseiros sobem de liga no fim da semana
export const PROMOTION_SLOTS = 3

// Dados de exemplo. Na Fase 2 o ranking vem do backend.
export const rivals: Rival[] = [
  { id: 'marina', name: 'Marina Concurseira • TJ/TRF', avatar: '🦊', xp: 1580, streak: 32, accuracy: 94, isPro: true },
  { id: 'lucas', name: 'Lucas Fiscal • RFB', avatar: '⚖️', xp: 1310, streak: 19 },
  { id: 'camila', name: 'Camila Delta • PF', avatar: '📚', xp: 1190, streak: 11 },
  { id: 'rafael', name: 'Rafael Analista • MPU', avatar: '🏛️', xp: 980, streak: 8 },
]
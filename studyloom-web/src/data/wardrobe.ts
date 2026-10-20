export type FurKey = 'classic' | 'urban-grey' | 'cream'
export type AccessoryKey = 'none' | 'glasses' | 'headphones' | 'both'
export type BasePoseKey = 'hero' | 'coach' | 'celebrate'
export type EpicId = 'dino' | 'judge' | 'auditor'

export interface FurOption {
  key: FurKey
  label: string
  buttonLabel: string
  swatch: string
}

export interface AccessoryOption {
  key: AccessoryKey
  label: string
  buttonLabel: string
}

export interface BasePose {
  key: BasePoseKey
  imgPath: string
  skinTag: string
  skinTitle: string
  buttonLabel: string
}

// Como cada fantasia épica é liberada
export type EpicUnlock =
  | { type: 'xp'; cost: number }
  | { type: 'league' }
  | { type: 'pro' }

export interface EpicCostume {
  id: EpicId
  imgPath: string
  imgAlt: string
  skinTag: string
  skinTitle: string
  cardTitle: string
  cardDesc: string
  tierBadge: string
  tierClass: string
  unlockReq: string
  equipLabel: string
  pushMsg: string
  unlock: EpicUnlock
}

export const furOptions: FurOption[] = [
  {
    key: 'classic',
    label: 'Laranja Clássico',
    buttonLabel: 'Laranja Clássico (Padrão)',
    swatch: 'linear-gradient(135deg, #FF5722, #FB923C)',
  },
  {
    key: 'urban-grey',
    label: 'Cinza Urbano',
    buttonLabel: 'Cinza Urbano',
    swatch: 'linear-gradient(135deg, #64748B, #CBD5E1)',
  },
  {
    key: 'cream',
    label: 'Creme Suave',
    buttonLabel: 'Creme Suave',
    swatch: 'linear-gradient(135deg, #FDE68A, #FFFBEB)',
  },
]

export const accessoryOptions: AccessoryOption[] = [
  { key: 'none', label: 'Sem Acessório', buttonLabel: '✨ Sem Acessório' },
  {
    key: 'glasses',
    label: 'Óculos de Grau de Concurseiro',
    buttonLabel: '👓 Óculos de Grau de Concurseiro',
  },
  {
    key: 'headphones',
    label: 'Fones de Ouvido para Estudo',
    buttonLabel: '🎧 Fones de Ouvido para Estudo',
  },
  {
    key: 'both',
    label: 'Combo Óculos + Fones de Estudo',
    buttonLabel: '👓+🎧 Combo Foco Total (Óculos + Fones)',
  },
]

export const basePoses: BasePose[] = [
  {
    key: 'hero',
    imgPath: '/assets/lumi-hero.jpg',
    skinTag: 'Lumi Aprovada 🎓',
    skinTitle: 'Lumi Concurseira Aprovada (Capelo & Diploma)',
    buttonLabel: '🎓 Lumi Padrão (Capelo Preto & Canudo de Formatura)',
  },
  {
    key: 'coach',
    imgPath: '/assets/lumi-coach.jpg',
    skinTag: 'Mentora c/ Diploma',
    skinTitle: 'Lumi Mentora de Banca (Capelo & Diploma)',
    buttonLabel: '📜 Lumi Mentora de Banca (Capelo & Diploma)',
  },
  {
    key: 'celebrate',
    imgPath: '/assets/lumi-celebrate.jpg',
    skinTag: 'Nomeação 🎓',
    skinTitle: 'Lumi Comemorando Aprovação c/ Diploma',
    buttonLabel: '🎉 Lumi Comemorando a Posse (Capelo & Diploma)',
  },
]

export const epicCostumes: EpicCostume[] = [
  {
    id: 'dino',
    imgPath: '/assets/lumi-dino.jpg',
    imgAlt: 'Lumi Pijama de Dinossauro 3D',
    skinTag: '🦖 Lumi Dino 3D',
    skinTitle: 'Fantasia Épica: Pijama de Dinossauro 🦖',
    cardTitle: '🦖 Pijama de Dinossauro',
    cardDesc:
      'Skin realista, fofa e detalhada com capuz de escamas, dentinhos de pelúcia e cauda texturizada.',
    tierBadge: '⚡ RECOMPENSA XP',
    tierClass: 'xp-tier',
    unlockReq: '🔓 Desbloqueável por XP (500 XP)',
    equipLabel: '🦖 Equipar Pijama de Dinossauro',
    pushMsg:
      '🦖 Pijama de Dinossauro equipado na Lumi 3D! Capuz de escamas e cauda texturizada prontos para o estudo!',
    unlock: { type: 'xp', cost: 500 },
  },
  {
    id: 'judge',
    imgPath: '/assets/lumi-judge.jpg',
    imgAlt: 'Lumi Toga de Juiz Magistrado 3D',
    skinTag: '⚖️ Lumi Magistrada',
    skinTitle: 'Fantasia Épica: Toga de Juiz / Magistrado ⚖️',
    cardTitle: '⚖️ Toga de Juiz / Magistrado',
    cardDesc:
      'Vestimenta solene com jabô branco, bordado dourado e martelo para as Ligas altas de carreiras jurídicas.',
    tierBadge: '🏆 LIGA MAGISTRATURA',
    tierClass: 'league-tier',
    unlockReq: '🏆 Recompensa da zona de promoção (top 3 da liga)',
    equipLabel: '🏆 Equipar Toga de Magistrado',
    pushMsg:
      '⚖️ Toga Solene de Juiz / Magistrado equipada na Lumi 3D! Autoridade máxima nas carreiras jurídicas!',
    unlock: { type: 'league' },
  },
  {
    id: 'auditor',
    imgPath: '/assets/lumi-auditor.jpg',
    imgAlt: 'Lumi Farda de Auditor Fiscal 3D',
    skinTag: '🛡️ Lumi Auditora',
    skinTitle: 'Fantasia Épica: Farda de Auditor / Fiscal 🛡️',
    cardTitle: '🛡️ Farda de Auditor / Fiscal',
    cardDesc:
      'Colete tático com insígnia dourada e tablet analítico voltado para concursos de controle e fiscalização.',
    tierBadge: '💎 STUDYLOOM PRO',
    tierClass: 'pro-tier',
    unlockReq: '💎 Exclusivo Plano Studyloom Pro',
    equipLabel: '💎 Equipar Farda de Auditor',
    pushMsg:
      '🛡️ Farda Tática de Auditor / Fiscal equipada na Lumi 3D! Pronta para gabaritar Controle e Fiscalização!',
    unlock: { type: 'pro' },
  },
]

// Acessórios desligados até existir arte própria da Lumi com óculos e fones.
// Os SVGs sobrepostos do protótipo não encaixam nas imagens 3D.
export const ACCESSORIES_ENABLED: boolean = false

export const STREAK_FREEZE_COST = 200
export const MAX_STREAK_FREEZES = 1

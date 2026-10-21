// Lugares onde aparece anúncio. Nunca durante a questão, para não atrapalhar o cronômetro.
// O painel direito fica sem anúncio porque já tem o card do Pro.
export type AdPlacement = 'battery-complete' | 'notebook'

export interface HouseAd {
  icon: string
  title: string
  text: string
  cta: string
  to: string
}

// Anúncios da casa, usados até existir uma rede de anúncios real
export const houseAds: Record<AdPlacement, HouseAd> = {
  'battery-complete': {
    icon: '💎',
    title: 'Estude sem anúncios',
    text: 'No Studyloom Pro não há anúncios e as vidas são ilimitadas.',
    cta: 'Conhecer o Pro',
    to: '/pro',
  },
  notebook: {
    icon: '🏆',
    title: 'Suba na liga',
    text: 'Cada bateria concluída soma XP no ranking da semana.',
    cta: 'Ver ranking',
    to: '/ligas',
  },
}

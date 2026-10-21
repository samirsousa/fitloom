export type ProPlanId = 'annual' | 'monthly'

export interface ProPlan {
  id: ProPlanId
  label: string
  // Preço equivalente por mês, em reais
  monthlyPrice: number
  billingNote: string
  ctaLabel: string
}

export const proPlans: ProPlan[] = [
  {
    id: 'annual',
    label: 'Plano Anual',
    monthlyPrice: 29.9,
    billingNote: 'Cobrado uma vez por ano',
    ctaLabel: 'Assinar plano anual',
  },
  {
    id: 'monthly',
    label: 'Plano Mensal',
    monthlyPrice: 59.9,
    billingNote: 'Cancele quando quiser, sem multa',
    ctaLabel: 'Assinar plano mensal',
  },
]

export function formatBrl(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// Economia do anual frente a 12 meses do mensal, calculada a partir dos preços
export function annualSavings() {
  const annual = proPlans.find((p) => p.id === 'annual')!
  const monthly = proPlans.find((p) => p.id === 'monthly')!
  return Math.round((monthly.monthlyPrice - annual.monthlyPrice) * 12)
}

export interface ProDiff {
  icon: string
  label: string
  free: string
  pro: string
}

// Só o que já funciona no app
export const proDiffs: ProDiff[] = [
  { icon: '♾️', label: 'Vidas', free: '5 por vez', pro: 'Ilimitadas' },
  { icon: '🛡️', label: 'Farda de Auditor', free: 'Bloqueada', pro: 'Inclusa' },
  { icon: '🚫', label: 'Anúncios', free: 'Exibidos', pro: 'Nenhum' },
]

// Recursos planejados. Não fazem parte da assinatura enquanto não existirem.
export const proUpcoming = [
  'Resumos do edital por IA',
  'trilha adaptativa',
  'baterias de nível avançado',
]

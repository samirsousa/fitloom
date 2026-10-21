export type CareerId = 'tribunais' | 'policiais' | 'fiscais' | 'administrativo'

export interface Career {
  id: CareerId
  icon: string
  // Nome curto, usado no foco do painel direito e do Perfil
  label: string
  // Nome completo, usado no card do onboarding
  title: string
  desc: string
  // Título do módulo no banner da Trilha
  moduleTitle: string
}

// TODO backend: hoje só o título do banner muda. As questões por carreira virão da API.
export const careers: Career[] = [
  {
    id: 'tribunais',
    icon: '⚖️',
    label: 'Tribunais & MP',
    title: 'Tribunais & MP (TJ, TRF, TRT, MPU)',
    desc: 'Foco em Lei Seca, Jurisprudência e Português nas bancas FGV e FCC.',
    moduleTitle: 'Português, Direito Constitucional & Raciocínio Lógico',
  },
  {
    id: 'policiais',
    icon: '🚓',
    label: 'Carreiras Policiais',
    title: 'Carreiras Policiais (PF, PRF, PC)',
    desc: 'Baterias no estilo Cebraspe (Certo/Errado), RLM e Direito Constitucional.',
    moduleTitle: 'Constitucional, Penal, RLM & Português',
  },
  {
    id: 'fiscais',
    icon: '📊',
    label: 'Fiscais & Controle',
    title: 'Fiscais & Controle (RFB, SEFAZ, TCU)',
    desc: 'Direito Tributário e Constitucional com treino de velocidade e precisão.',
    moduleTitle: 'Direito Constitucional, Tributário, RLM & Português',
  },
  {
    id: 'administrativo',
    icon: '🏛️',
    label: 'Administrativo & Bancos',
    title: 'CNU, INSS & Bancários',
    desc: 'Base sólida nas disciplinas nucleares de todos os editais.',
    moduleTitle: 'Português, Raciocínio Lógico & Direito Constitucional',
  },
]

export const DEFAULT_CAREER_ID: CareerId = 'tribunais'

export function careerById(id: CareerId) {
  return careers.find((c) => c.id === id) ?? careers[0]
}

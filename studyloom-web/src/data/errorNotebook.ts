export interface WeakPoint {
  id: string
  title: string
  badge: string
  trap: string
  answer: string
}

export interface Flashcard {
  id: string
  icon: string
  frontLabel: string
  backTitle: string
  backText: string
}

export const weakPoints: WeakPoint[] = [
  {
    id: 'inviolabilidade',
    title: '1. Direito Constitucional — Inviolabilidade de Domicílio (Art. 5º, XI)',
    badge: '⚠️ Cebraspe / FGV',
    trap: '"Ordem judicial permite entrar na casa à noite sem consentimento do morador."',
    answer:
      'Ordem judicial SÓ permite entrada durante o dia! À noite, apenas flagrante delito, desastre ou para prestar socorro.',
  },
  {
    id: 'mane',
    title: '2. Raciocínio Lógico — Negação da Condicional (Se P, então Q)',
    badge: '⚠️ Regra do MANÉ',
    trap: 'Negar "Se estudo, passo" dizendo "Se não estudo, não passo".',
    answer: 'MAntém a primeira E NEga a segunda: "Estudo E não passo".',
  },
]

export const flashcards: Flashcard[] = [
  {
    id: 'crase',
    icon: '📚',
    frontLabel: 'Português: Crase',
    backTitle: '📚 Crase Proibida',
    backText: 'NUNCA ocorre crase antes de verbos, pronomes pessoais ou palavras masculinas!',
  },
  {
    id: 'petreas',
    icon: '⚖️',
    frontLabel: 'CF/88: FO-VO-SE-DI',
    backTitle: '⚖️ Cláusulas Pétreas',
    backText:
      'Art. 60 §4º CF: Forma federativa, Voto DSU, Separação dos Poderes e Direitos/Garantias Individuais.',
  },
  {
    id: 'atos',
    icon: '🏛️',
    frontLabel: 'Dir. Administrativo',
    backTitle: '🏛️ Atos Administrativos',
    backText: 'Requisitos (CO-FI-FO-MO-OB): Competência, Finalidade, Forma, Motivo e Objeto.',
  },
]
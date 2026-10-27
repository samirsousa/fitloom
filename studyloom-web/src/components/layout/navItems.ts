export interface NavItem {
  to: string
  icon: string
  label: string
  // Rotas que deixam este item marcado como ativo
  matches: string[]
  className?: string
}

export const sidebarItems: NavItem[] = [
  { to: '/', icon: '🏠', label: 'Trilha do Edital', matches: ['/', '/quiz'] },
  { to: '/erros', icon: '🎯', label: 'Caderno de Erros', matches: ['/erros'] },
  { to: '/ligas', icon: '🏆', label: 'Ligas & Ranking', matches: ['/ligas'] },
  { to: '/comunidade', icon: '❤️', label: 'Comunidade', matches: ['/comunidade'] },
  { to: '/loja', icon: '🦊', label: 'Loja da Lumi', matches: ['/loja'] },
  { to: '/pro', icon: '💎', label: 'GoLumi Pro', matches: ['/pro'], className: 'pro-tab' },
  { to: '/perfil', icon: '👤', label: 'Perfil & Acertos', matches: ['/perfil'] },
]

export const bottomItems: NavItem[] = [
  { to: '/', icon: '🏠', label: 'Edital', matches: ['/', '/erros', '/quiz'] },
  { to: '/ligas', icon: '🏆', label: 'Ligas', matches: ['/ligas'] },
  { to: '/comunidade', icon: '❤️', label: 'Social', matches: ['/comunidade'] },
  { to: '/loja', icon: '🦊', label: 'Loja', matches: ['/loja'] },
  { to: '/pro', icon: '💎', label: 'Pro', matches: ['/pro'] },
  { to: '/perfil', icon: '👤', label: 'Perfil', matches: ['/perfil'] },
]
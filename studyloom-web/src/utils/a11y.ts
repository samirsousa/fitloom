import type { KeyboardEvent } from 'react'

// Torna clicável pelo teclado (Tab, Enter e Espaço) um elemento que não é <button>,
// sem mudar o visual herdado do protótipo
export function pressable(onActivate: () => void, label?: string) {
  return {
    role: 'button' as const,
    tabIndex: 0,
    'aria-label': label,
    onClick: onActivate,
    onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onActivate()
      }
    },
  }
}

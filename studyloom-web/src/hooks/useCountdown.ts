import { useEffect, useState } from 'react'

// Conta regressiva em segundos. Para quando `active` vira false ou chega a zero.
export function useCountdown(seconds: number, active: boolean) {
  const [left, setLeft] = useState(seconds)
  const finished = left === 0

  useEffect(() => {
    if (!active || finished) return
    const id = window.setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    return () => window.clearInterval(id)
  }, [active, finished])

  return left
}
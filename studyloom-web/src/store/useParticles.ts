import { create } from 'zustand'

export type ParticleMode = 'confetti' | 'flames' | 'hearts'

interface ParticlesState {
  // Registrada pelo ParticlesCanvas montado no AppShell. Sem canvas, não faz nada.
  spawn: (mode: ParticleMode) => void
}

export const useParticles = create<ParticlesState>(() => ({
  spawn: () => {},
}))

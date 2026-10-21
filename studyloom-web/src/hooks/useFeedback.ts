import { useGameStore } from '../store/useGameStore'
import { useParticles, type ParticleMode } from '../store/useParticles'
import { playSound, type SoundType } from './useSound'

export type FeedbackEvent =
  | 'tap'
  | 'correct'
  | 'bonus'
  | 'wrong'
  | 'batteryComplete'
  | 'reward'
  | 'proActivated'
  | 'heartsRefill'
  | 'freeze'
  | 'highFive'
  | 'onboardingDone'

interface Recipe {
  sound?: SoundType
  // Partículas com atraso opcional em ms, para encadear confete e chamas
  particles?: [ParticleMode, number?][]
  vibrate?: number | number[]
}

const SHORT = 30
const DOUBLE = [60, 40, 60]

// Mapa de efeitos aprovado na Etapa 5. Navegação e banner da Lumi ficam sem efeito.
const recipes: Record<FeedbackEvent, Recipe> = {
  tap: { sound: 'pop' },
  correct: { sound: 'correct', vibrate: SHORT },
  // Confete só quando o acerto vem com o bônus 2x
  bonus: { sound: 'correct', particles: [['confetti']], vibrate: SHORT },
  wrong: { sound: 'wrong', vibrate: DOUBLE },
  batteryComplete: { sound: 'fanfare', particles: [['confetti'], ['flames', 300]], vibrate: SHORT },
  reward: { sound: 'fanfare', particles: [['confetti']], vibrate: SHORT },
  proActivated: { sound: 'fanfare', particles: [['confetti'], ['hearts', 250]], vibrate: SHORT },
  heartsRefill: { sound: 'correct', particles: [['hearts']] },
  freeze: { sound: 'correct', particles: [['confetti']] },
  highFive: { sound: 'correct', particles: [['flames']], vibrate: SHORT },
  onboardingDone: { sound: 'fanfare', particles: [['confetti'], ['flames']] },
}

export function triggerFeedback(event: FeedbackEvent) {
  const recipe = recipes[event]
  const { soundEnabled } = useGameStore.getState()
  const { spawn } = useParticles.getState()

  if (soundEnabled && recipe.sound) playSound(recipe.sound)
  // Vibração só no Android: o Safari do iPhone não tem navigator.vibrate
  if (soundEnabled && recipe.vibrate && 'vibrate' in navigator) navigator.vibrate(recipe.vibrate)
  // Partículas seguem prefers-reduced-motion, não o controle de som
  for (const [mode, delay] of recipe.particles ?? []) {
    if (delay) window.setTimeout(() => useParticles.getState().spawn(mode), delay)
    else spawn(mode)
  }
}

export function useFeedback() {
  return triggerFeedback
}

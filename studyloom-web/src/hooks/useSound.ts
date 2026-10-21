export type SoundType = 'correct' | 'wrong' | 'fanfare' | 'pop'

interface Tone {
  freq: number
  // Frequência final, para o glissando do 'pop'
  freqTo?: number
  start: number
  duration: number
  gain: number
  wave: OscillatorType
}

// Mesmas notas e tempos do protótipo
function tones(type: SoundType): Tone[] {
  switch (type) {
    case 'correct':
      return [523.25, 659.25, 783.99, 1046.5].map((freq, i) => ({
        freq, start: i * 0.065, duration: 0.24, gain: 0.16, wave: 'triangle',
      }))
    case 'wrong':
      return [240, 195].map((freq, i) => ({
        freq, start: i * 0.12, duration: 0.22, gain: 0.1, wave: 'sawtooth',
      }))
    case 'fanfare':
      return [523.25, 659.25, 783.99, 1046.5, 1318.51].map((freq, i) => ({
        freq, start: i * 0.08, duration: 0.38, gain: 0.18, wave: 'sine',
      }))
    case 'pop':
      return [{ freq: 580, freqTo: 880, start: 0, duration: 0.11, gain: 0.12, wave: 'sine' }]
  }
}

let audioCtx: AudioContext | null = null

// O iOS só libera o áudio dentro de um gesto do usuário. O AppShell chama isto no primeiro toque.
export function unlockAudio() {
  try {
    if (!audioCtx) {
      const Ctx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Ctx) return
      audioCtx = new Ctx()
    }
    if (audioCtx.state === 'suspended') void audioCtx.resume()
  } catch {
    audioCtx = null
  }
}

// Toca sem checar a preferência do usuário. Nas telas, use useFeedback().
export function playSound(type: SoundType) {
  if (!audioCtx || audioCtx.state === 'closed') return
  const ctx = audioCtx
  // Suspenso ainda no primeiro toque: as notas ficam agendadas e tocam quando retomar
  if (ctx.state === 'suspended') void ctx.resume()
  const now = ctx.currentTime
  for (const t of tones(type)) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = t.wave
    osc.frequency.setValueAtTime(t.freq, now + t.start)
    if (t.freqTo) osc.frequency.exponentialRampToValueAtTime(t.freqTo, now + t.start + 0.09)
    gain.gain.setValueAtTime(t.gain, now + t.start)
    gain.gain.exponentialRampToValueAtTime(0.001, now + t.start + t.duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now + t.start)
    osc.stop(now + t.start + t.duration + 0.02)
  }
}

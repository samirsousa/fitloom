import { useEffect, useRef } from 'react'
import { useParticles, type ParticleMode } from '../../store/useParticles'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  gravity: number
  size: number
  color: string
  rotation: number
  vr: number
  alpha: number
  mode: ParticleMode
}

const COLORS = ['#FF5722', '#10B981', '#0D9488', '#FBBF24', '#FF4B4B', '#34D399']
const EMOJI: Partial<Record<ParticleMode, string>> = { flames: '🔥', hearts: '❤️' }
// Teto de partículas na tela, para não pesar em celulares mais simples
const MAX_PARTICLES = 220

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

// Mesma física do protótipo, em um canvas fixo por cima de tudo que não captura cliques
export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let particles: Particle[] = []
    let frame = 0
    let width = 0
    let height = 0

    function resize() {
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function render() {
      ctx!.clearRect(0, 0, width, height)
      for (const p of particles) {
        const rising = p.mode !== 'confetti'
        p.x += p.vx
        p.y += p.vy
        p.vy += p.gravity
        p.rotation += p.vr
        p.alpha -= rising ? 0.02 : 0.015

        ctx!.save()
        ctx!.globalAlpha = Math.max(0, p.alpha)
        ctx!.translate(p.x, p.y)
        ctx!.rotate(p.rotation)
        const emoji = EMOJI[p.mode]
        if (emoji) {
          ctx!.font = `${Math.round(p.size)}px sans-serif`
          ctx!.fillText(emoji, -p.size / 2, p.size / 2)
        } else {
          ctx!.fillStyle = p.color
          ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65)
        }
        ctx!.restore()
      }
      particles = particles.filter((p) => p.alpha > 0)
      frame = particles.length > 0 ? requestAnimationFrame(render) : 0
    }

    function spawn(mode: ParticleMode) {
      if (reducedMotion.matches) return
      const rising = mode !== 'confetti'
      const count = Math.min(rising ? 24 : 55, MAX_PARTICLES - particles.length)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: width * (0.25 + Math.random() * 0.5),
          y: height * (rising ? 0.48 : 0.35),
          vx: (Math.random() - 0.5) * 11,
          vy: rising ? -(3.5 + Math.random() * 6.5) : -(6 + Math.random() * 9),
          gravity: rising ? -0.04 : 0.24,
          size: rising ? 18 + Math.random() * 10 : 8 + Math.random() * 7,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          rotation: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.2,
          alpha: 1,
          mode,
        })
      }
      if (!frame && particles.length > 0) frame = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    useParticles.setState({ spawn })

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frame)
      useParticles.setState({ spawn: () => {} })
    }
  }, [])

  return <canvas id="fx-canvas" ref={canvasRef} aria-hidden="true" />
}

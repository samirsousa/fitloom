import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { careerById, careers, type CareerId } from '../../data/careers'
import { dailyGoals } from '../../data/dailyGoals'
import { useGameStore } from '../../store/useGameStore'
import { useIntroStore } from '../../store/useIntroStore'
import { useLumiPush } from '../../store/useLumiPush'
import LumiSplashFace from './LumiSplashFace'

const SPLASH_MS = 1800
// Duração da transição de .intro-overlay.hidden no CSS
const CLOSE_MS = 450
const NAME_MAX = 24
const DEFAULT_NAME = 'Concurseiro'

type Step = 0 | 1 | 2 | 3

const stepProgress: Record<Step, { pct: number; label: string }> = {
  0: { pct: 20, label: 'Boas-vindas' },
  1: { pct: 50, label: 'Etapa 1 / 2 • Carreira-Alvo' },
  2: { pct: 80, label: 'Etapa 2 / 2 • Meta Diária' },
  3: { pct: 100, label: 'Trilha Pronta! 🎉' },
}

// Aparece até o onboarding ser concluído ou pulado, e de novo pelo botão "Rever abertura"
export default function IntroOverlay() {
  const completed = useGameStore((s) => s.onboardingCompleted)
  const replayOpen = useIntroStore((s) => s.replayOpen)
  if (completed && !replayOpen) return null
  return <IntroFlow />
}

function IntroFlow() {
  const navigate = useNavigate()
  const game = useGameStore()
  const closeReplay = useIntroStore((s) => s.close)
  const showPush = useLumiPush((s) => s.show)

  const [splashOut, setSplashOut] = useState(false)
  const [closing, setClosing] = useState(false)
  const [step, setStep] = useState<Step>(0)
  // Ao rever a abertura, as escolhas atuais já vêm marcadas
  const [careerId, setCareerId] = useState<CareerId | null>(
    game.onboardingCompleted ? game.careerId : null,
  )
  const [goalXp, setGoalXp] = useState<number | null>(
    game.onboardingCompleted ? game.dailyXpGoal : null,
  )
  const [name, setName] = useState(game.userName === DEFAULT_NAME ? '' : game.userName)

  const timers = useRef<number[]>([])
  function later(fn: () => void, ms: number) {
    timers.current.push(window.setTimeout(fn, ms))
  }

  useEffect(() => {
    const pending = timers.current
    const splashTimer = window.setTimeout(() => setSplashOut(true), SPLASH_MS)
    return () => {
      window.clearTimeout(splashTimer)
      pending.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  function closeThen(apply: () => void) {
    if (closing) return
    setClosing(true)
    later(() => {
      apply()
      closeReplay()
      navigate('/')
    }, CLOSE_MS)
  }

  function skip() {
    // Etapa 5: som 'pop'
    closeThen(() => {
      if (!game.onboardingCompleted) game.skipOnboarding()
    })
  }

  function chooseCareer(id: CareerId) {
    // Etapa 5: som 'correct'
    setCareerId(id)
    later(() => setStep(2), 240)
  }

  function chooseGoal(xp: number) {
    // Etapa 5: som 'correct' e partículas de confete
    setGoalXp(xp)
    later(() => setStep(3), 280)
  }

  function finish(e: FormEvent) {
    e.preventDefault()
    const userName = name.trim() || DEFAULT_NAME
    const career = careerById(careerId ?? game.careerId)
    // Etapa 5: som 'fanfare' e partículas de confete e chamas
    closeThen(() => {
      game.completeOnboarding({
        userName,
        careerId: career.id,
        dailyXpGoal: goalXp ?? game.dailyXpGoal,
      })
      showPush(
        `🔥 Bem-vindo(a), ${userName}! Sua Trilha para "${career.label}" está pronta. Conclua uma bateria hoje para manter a ofensiva acesa.`,
      )
    })
  }

  const progress = stepProgress[step]
  const career = careerId ? careerById(careerId) : null
  const goal = dailyGoals.find((g) => g.xp === goalXp)

  return (
    <div
      className={`intro-overlay${closing ? ' hidden' : ''}`}
      id="intro-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Boas-vindas ao Studyloom"
    >
      <div
        className={`splash-orange-stage${splashOut ? ' fade-out' : ''}`}
        id="splash-orange-stage"
        onClick={() => setSplashOut(true)}
      >
        <div style={{ height: 24 }} />
        <LumiSplashFace />
        <div className="splash-bottom-brand">
          <div className="splash-app-name">Studyloom</div>
          <div className="splash-app-tagline">Preparação Gamificada para Concursos</div>
        </div>
      </div>

      <div className="onboarding-wizard-shell">
        <header className="onb-top-bar">
          <div className="sidebar-brand" style={{ padding: 0 }}>
            <div className="brand-icon-3d">S</div>
            <div className="brand-wordmark">
              Study<span>loom</span>
            </div>
          </div>

          <div className="onb-progress-wrap">
            <div className="onb-progress-track">
              <div className="onb-progress-fill" style={{ width: `${progress.pct}%` }} />
            </div>
            <span style={{ fontSize: '0.78rem', fontWeight: 900, color: 'var(--orange-400)' }}>
              {progress.label}
            </span>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              className="sidebar-util-btn"
              style={{ width: 'auto' }}
              onClick={game.toggleTheme}
            >
              {game.theme === 'dark' ? '☀️ Tema' : '🌙 Tema'}
            </button>
            <button type="button" className="sidebar-util-btn" style={{ width: 'auto' }} onClick={skip}>
              Pular ➔
            </button>
          </div>
        </header>

        {step === 0 && (
          <section className="onb-step-stage active" id="onb-step-0">
            <div className="kiss-camera-viewport">
              <img
                src="/assets/lumi-hero.jpg"
                alt="Lumi 3D sorrindo e fazendo um joinha"
                className="lumi-thumbsup-img"
              />
            </div>
            <div className="onb-copy-col">
              <div className="onb-speech-bubble">
                🦊 <strong>Lumi:</strong> "Rumo à aprovação no Studyloom! 👍 Eu sou a Lumi e vou
                transformar o seu edital em baterias rápidas de questões com cronômetro e gabarito
                comentado!"
              </div>
              <h1 className="onb-title">Domine o edital resolvendo questões todos os dias.</h1>
              <p className="onb-subtitle">
                Treine Português, Direito Constitucional, Raciocínio Lógico e Administrativo com bônus
                de velocidade. Responda 2 perguntas para a Lumi ajustar a Trilha do Edital ao seu foco!
              </p>
              <button type="button" className="btn-vamos-iniciar" onClick={() => setStep(1)}>
                <span>Vamos Iniciar</span>
                <span>➔</span>
              </button>
            </div>
          </section>
        )}

        {step === 1 && (
          <section className="onb-step-stage active" id="onb-step-1">
            <div className="kiss-camera-viewport">
              <img
                src="/assets/lumi-hero.jpg"
                alt="Lumi 3D perguntando sua carreira-alvo"
                className="lumi-thumbsup-img"
              />
            </div>
            <div className="onb-copy-col">
              <div className="onb-speech-bubble">
                🦊 <strong>Pergunta 1 de 2:</strong> "Qual é a sua carreira-alvo principal no
                Studyloom?"
              </div>
              <h2 className="onb-title">Escolha sua Carreira-Alvo</h2>
              <div className="onb-options-grid">
                {careers.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`onb-choice-card${careerId === c.id ? ' selected' : ''}`}
                    onClick={() => chooseCareer(c.id)}
                  >
                    <span className="onb-choice-icon">{c.icon}</span>
                    <div>
                      <div className="onb-choice-title">{c.title}</div>
                      <div className="onb-choice-desc">{c.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="onb-step-stage active" id="onb-step-2">
            <div className="kiss-camera-viewport">
              <img
                src="/assets/lumi-coach.jpg"
                alt="Lumi Coach definindo sua meta diária"
                className="lumi-thumbsup-img"
              />
            </div>
            <div className="onb-copy-col">
              <div className="onb-speech-bubble">
                🦊 <strong>Pergunta 2 de 2:</strong> "Excelente carreira! Quanto XP você quer
                conquistar por dia resolvendo questões?"
              </div>
              <h2 className="onb-title">Sua meta diária de estudo</h2>
              <div className="onb-options-grid">
                {dailyGoals.map((g) => (
                  <button
                    key={g.xp}
                    type="button"
                    className={`onb-choice-card${goalXp === g.xp ? ' selected' : ''}`}
                    onClick={() => chooseGoal(g.xp)}
                  >
                    <span className="onb-choice-icon">{g.icon}</span>
                    <div>
                      <div className="onb-choice-title">{g.title}</div>
                      <div className="onb-choice-desc">{g.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="onb-step-stage active" id="onb-step-3">
            <div className="kiss-camera-viewport">
              <img
                src="/assets/lumi-celebrate.jpg"
                alt="Lumi 3D entregando sua Trilha do Edital"
                className="lumi-thumbsup-img"
              />
            </div>
            <form className="onb-copy-col" onSubmit={finish}>
              <div className="onb-speech-bubble">
                🎉 <strong>Sua Trilha no Studyloom está pronta!</strong> Diga como a Lumi deve te chamar
                e conclua a primeira bateria para manter sua <strong>ofensiva (🔥)</strong> acesa!
              </div>
              <h2 className="onb-title">Como a Lumi deve te chamar?</h2>
              <div className="conversion-summary-badges">
                {career && (
                  <span className="conv-pill">
                    {career.icon} Carreira: {career.label}
                  </span>
                )}
                {goal && <span className="conv-pill">🔥 Meta: {goal.xp} XP/dia</span>}
              </div>
              <input
                type="text"
                className="fit-input"
                placeholder="Seu nome de concurseiro(a)"
                aria-label="Seu nome"
                maxLength={NAME_MAX}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              <button type="submit" className="btn-vamos-iniciar">
                <span>🔥 Começar minha Trilha</span>
              </button>
            </form>
          </section>
        )}

        <footer
          style={{
            textAlign: 'center',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            fontWeight: 700,
          }}
        >
          Studyloom • Plataforma Web Responsiva para Concursos Públicos • Guiada pela Mentora 3D Lumi
        </footer>
      </div>
    </div>
  )
}

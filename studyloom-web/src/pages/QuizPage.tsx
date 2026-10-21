import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { questions } from '../data/questions'
import { HEART_REFILL_COST, useGameStore } from '../store/useGameStore'
import QuestionCard, { type AnswerResult } from '../components/quiz/QuestionCard'
import AdSlot from '../components/ads/AdSlot'
import { useFeedback } from '../hooks/useFeedback'
import { asset } from '../utils/asset'

export default function QuizPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const fx = useFeedback()
  const stateIndex = (location.state as { startIndex?: number } | null)?.startIndex ?? 0
  const startIndex = stateIndex >= 0 && stateIndex < questions.length ? stateIndex : 0

  const {
    hearts,
    isPro,
    totalXp,
    streak,
    addXp,
    loseHeart,
    recordAnswer,
    completeBattery,
    refillHeartsWithXp,
  } = useGameStore()

  const [index, setIndex] = useState(startIndex)
  const [answeredCurrent, setAnsweredCurrent] = useState(false)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [sessionXp, setSessionXp] = useState(0)
  const [finished, setFinished] = useState(false)

  const isLast = index === questions.length - 1
  const outOfHearts = !isPro && hearts === 0

  function handleAnswer(result: AnswerResult) {
    setAnsweredCurrent(true)
    setAnsweredCount((c) => c + 1)
    recordAnswer(result.correct)
    fx(result.correct ? (result.fast ? 'bonus' : 'correct') : 'wrong')
    if (result.correct) {
      setCorrectCount((c) => c + 1)
      setSessionXp((x) => x + result.gainedXp)
      addXp(result.gainedXp)
    } else {
      loseHeart()
    }
  }

  function handleNext() {
    setAnsweredCurrent(false)
    if (isLast) {
      completeBattery()
      setFinished(true)
      fx('batteryComplete')
    } else {
      setIndex((i) => i + 1)
    }
  }

  const topBar = (
    <div className="quiz-top-bar">
      <button
        type="button"
        className="quiz-close-btn"
        onClick={() => navigate('/')}
        title="Sair da bateria"
        aria-label="Sair da bateria"
      >
        ✕
      </button>
      <div className="stories-segments">
        {questions.map((q, i) => {
          const state = i < index || (finished && i <= index) ? ' completed' : i === index ? ' active' : ''
          return (
            <div key={q.id} className={`story-segment${state}`}>
              <div className="story-segment-fill" />
            </div>
          )
        })}
      </div>
    </div>
  )

  if (finished) {
    const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0
    return (
      <section className="app-screen active" id="screen-quiz" aria-label="Bateria concluída">
        {topBar}
        <div className="lesson-complete-modal visible">
          <div className="celebrate-lumi-box">
            <img src={asset('/assets/lumi-celebrate.webp')} alt="Lumi comemorando" />
          </div>
          <span className="story-pillar-badge workout">🔥 BATERIA DE EDITAL CONCLUÍDA!</span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Mais perto da nomeação!</h2>
          <p
            style={{
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              maxWidth: 380,
              fontWeight: 600,
            }}
          >
            Suas respostas foram registradas. Veja como foi o seu desempenho nesta bateria.
          </p>

          <div className="reward-stats-grid">
            <div className="reward-stat-box">
              <div className="reward-stat-label">XP ganho</div>
              <div className="reward-stat-val">+{sessionXp} XP</div>
            </div>
            <div className="reward-stat-box">
              <div className="reward-stat-label">Ofensiva</div>
              <div className="reward-stat-val">🔥 {streak}d</div>
            </div>
            <div className="reward-stat-box">
              <div className="reward-stat-label">Aproveitamento</div>
              <div className="reward-stat-val">{accuracy}%</div>
            </div>
          </div>

          <button type="button" className="primary-3d-btn emerald" onClick={() => navigate('/')}>
            Voltar para a Trilha do Edital 🏆
          </button>

          <AdSlot placement="battery-complete" />
        </div>
      </section>
    )
  }

  if (outOfHearts && !answeredCurrent) {
    return (
      <section className="app-screen active" id="screen-quiz" aria-label="Sem vidas">
        {topBar}
        <article
          className="story-quiz-card"
          style={{ alignItems: 'center', textAlign: 'center' }}
        >
          <span className="story-pillar-badge workout">💔 SEM VIDAS</span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900 }}>Suas vidas acabaram</h2>
          <p style={{ color: 'var(--text-secondary)', fontWeight: 600, maxWidth: 380 }}>
            Recarregue as vidas com XP para continuar a bateria, ou volte para a trilha.
          </p>
          <button
            type="button"
            className="primary-3d-btn"
            disabled={totalXp < HEART_REFILL_COST}
            onClick={() => refillHeartsWithXp()}
          >
            Recarregar vidas ({HEART_REFILL_COST} XP)
          </button>
          <button type="button" className="primary-3d-btn emerald" onClick={() => navigate('/')}>
            Voltar para a Trilha
          </button>
        </article>
      </section>
    )
  }

  let nextLabel = 'Próxima Questão da Bateria ➔'
  if (isLast) nextLabel = 'Concluir Bateria & Ver Desempenho 🏆'
  else if (outOfHearts) nextLabel = 'Você ficou sem vidas ➔'

  return (
    <section className="app-screen active" id="screen-quiz" aria-label="Bateria de questões">
      {topBar}
      <QuestionCard
        key={index}
        question={questions[index]}
        index={index}
        total={questions.length}
        nextLabel={nextLabel}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    </section>
  )
}
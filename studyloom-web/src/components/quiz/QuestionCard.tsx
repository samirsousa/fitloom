import { useState } from 'react'
import { useCountdown } from '../../hooks/useCountdown'
import type { Question } from '../../data/questions'
import { asset } from '../../utils/asset'

export interface AnswerResult {
  correct: boolean
  gainedXp: number
  fast: boolean
}

interface Props {
  question: Question
  index: number
  total: number
  nextLabel: string
  onAnswer: (result: AnswerResult) => void
  onNext: () => void
}

const URGENT_AT_SECONDS = 8
// O bônus 2x vale enquanto restar mais da metade do tempo
const BONUS_RATIO = 0.5

export default function QuestionCard({
  question,
  index,
  total,
  nextLabel,
  onAnswer,
  onNext,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const [result, setResult] = useState<AnswerResult | null>(null)

  const secondsLeft = useCountdown(question.timeLimit, selected === null)
  const bonusActive = secondsLeft > question.timeLimit * BONUS_RATIO
  const urgent = secondsLeft > 0 && secondsLeft <= URGENT_AT_SECONDS
  const pct = Math.round((secondsLeft / question.timeLimit) * 100)
  const elapsed = question.timeLimit - secondsLeft

  function handleSelect(i: number) {
    if (selected !== null) return
    const correct = question.options[i].correct
    const fast = correct && bonusActive
    const gainedXp = correct ? (fast ? question.xp * 2 : question.xp) : 0
    const res = { correct, gainedXp, fast }
    setSelected(i)
    setResult(res)
    onAnswer(res)
  }

  let pillText = '⚡ BÔNUS AGILIDADE 2X XP ATIVO!'
  if (result?.fast) {
    pillText = `⚡ BÔNUS 2X XP CONQUISTADO EM ${elapsed}s! (+${result.gainedXp} XP)`
  } else if (secondsLeft === 0) {
    pillText = '⏱️ TEMPO ESGOTADO (XP NORMAL)'
  } else if (!bonusActive) {
    pillText = '⏱️ BÔNUS 2X ENCERRADO (XP NORMAL)'
  }

  let lumiSrc = question.type === 'true_false' ? asset('/assets/lumi-coach.webp') : asset('/assets/lumi-hero.webp')
  if (result) {
    lumiSrc = result.correct ? asset('/assets/lumi-celebrate.webp') : asset('/assets/lumi-coach.webp')
  }

  let feedbackTitle = ''
  if (result) {
    if (!result.correct) feedbackTitle = question.lumiFailTitle
    else if (result.fast) feedbackTitle = `${question.lumiSuccessTitle} (⚡ +${result.gainedXp} XP Bônus 2x!)`
    else feedbackTitle = `${question.lumiSuccessTitle} (+${result.gainedXp} XP)`
  }

  return (
    <article className="story-quiz-card">
      <div className="story-header-meta">
        <span className={`story-pillar-badge ${question.pillar}`}>
          {question.badgeIcon} Questão {index + 1}/{total} • {question.subject}
        </span>
        <span className="story-xp-pill">
          Base: +{question.xp} XP | Rápido: +{question.xp * 2} XP ⚡
        </span>
      </div>

      <div className="question-timer-box">
        <div className="question-timer-top">
          <span className={`timer-countdown-badge${urgent ? ' urgent' : ''}`}>
            ⏱️ Tempo da Questão: <span>{secondsLeft}s</span>
          </span>
          <span className={`bonus-2x-pill${bonusActive || result?.fast ? '' : ' expired'}`}>
            {pillText}
          </span>
        </div>
        <div className="question-timer-track">
          <div
            className={`question-timer-fill${urgent ? ' urgent' : ''}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="quiz-lumi-presenter">
        <div className="quiz-lumi-avatar">
          <img src={lumiSrc} alt="Lumi na questão" />
        </div>
        <div className="quiz-prompt-bubble">
          <div className="quiz-micro-lesson">{question.microTip}</div>
          <h2 className="quiz-question-title">{question.question}</h2>
        </div>
      </div>

      <div className="quiz-visual-cue">
        <div className="cue-icon-box">{question.cueIcon}</div>
        <div>{question.cueText}</div>
      </div>

      <div className={`quiz-options-list${question.type === 'true_false' ? ' tf-grid' : ''}`}>
        {question.options.map((opt, i) => {
          const answered = selected !== null
          const classes = ['quiz-option-btn']
          if (answered && opt.correct) classes.push('correct')
          if (answered && i === selected && !opt.correct) classes.push('wrong')
          return (
            <button
              key={opt.key}
              type="button"
              className={classes.join(' ')}
              disabled={answered}
              onClick={() => handleSelect(i)}
            >
              <span className="option-key">{opt.key}</span>
              <span>{opt.text}</span>
            </button>
          )
        })}
      </div>

      <div
        className={`quiz-feedback-panel${
          result ? ` visible ${result.correct ? 'is-correct' : 'is-wrong'}` : ''
        }`}
      >
        <div className="feedback-header">{feedbackTitle}</div>
        <p className="feedback-explanation">
          {result?.correct ? question.lumiSuccessMsg : question.lumiFailMsg}
        </p>
        <button type="button" className="primary-3d-btn" onClick={onNext}>
          {nextLabel}
        </button>
      </div>
    </article>
  )
}
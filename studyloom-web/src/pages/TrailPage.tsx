import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { careerById } from '../data/careers'
import { LEAGUE_NAME } from '../data/leagueRivals'
import { lumiTrailSpeeches, trailNodes, type TrailAction } from '../data/trailNodes'
import { useLeague } from '../hooks/useLeague'
import { useFeedback } from '../hooks/useFeedback'
import { pressable } from '../utils/a11y'
import { useGameStore } from '../store/useGameStore'
import { useLumiPush } from '../store/useLumiPush'
import LumiAvatar from '../components/lumi/LumiAvatar'

export default function TrailPage() {
  const navigate = useNavigate()
  const chestOpened = useGameStore((s) => s.chestOpened)
  const claimChest = useGameStore((s) => s.claimChest)
  const career = careerById(useGameStore((s) => s.careerId))
  const showPush = useLumiPush((s) => s.show)
  const fx = useFeedback()
  const [speechIdx, setSpeechIdx] = useState(0)
  const { myRank } = useLeague()
  const speeches = lumiTrailSpeeches(myRank)

  function handleAction(action: TrailAction) {
    if (action.type === 'quiz') {
      navigate('/quiz', { state: { startIndex: action.index } })
    } else if (action.type === 'route') {
      navigate(action.to)
    } else if (claimChest()) {
      fx('reward')
      showPush(`🎁 BAÚ DO APROVADO ABERTO! +50 XP adicionados ao seu ranking na ${LEAGUE_NAME}!`)
    }
  }

  function interactWithLumi() {
    fx('tap')
    setSpeechIdx((i) => (i + 1) % speeches.length)
  }

  return (
    <section className="app-screen active" id="screen-trail" aria-label="A Trilha do Edital">
      <div className="section-header-banner">
        <div>
          <div className="section-phase-tag">BLOCO 1 • DISCIPLINAS NUCLEARES DO EDITAL</div>
          <div className="section-module-title">{career.moduleTitle}</div>
        </div>
        <button
          type="button"
          className="section-practice-btn"
          onClick={() => navigate('/quiz', { state: { startIndex: 0 } })}
        >
          <span>⏱️</span>
          <span>Resolver Questões</span>
        </button>
      </div>

      <div className="focused-practice-strip" {...pressable(() => navigate('/erros'))}>
        <div className="fp-strip-left">
          <div className="fp-strip-icon">📚</div>
          <div>
            <div className="fp-strip-title">Caderno de Erros &amp; Flashcards da Lei Seca</div>
            <div className="fp-strip-sub">
              Meta: 30 min/dia • Revise 2 pegadinhas de banca (FGV/Cebraspe) e 3 súmulas
            </div>
          </div>
        </div>
        <span className="fp-strip-cta">Revisar ➔</span>
      </div>

      <div className="zigzag-trail">
        <svg
          className="zigzag-svg-bg"
          viewBox="0 0 320 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M160 30 L 82 140 L 160 255 L 238 370 L 104 485 L 160 595"
            stroke="var(--border-subtle)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="16 14"
          />
          <path
            d="M160 30 L 82 140 L 160 255"
            stroke="var(--orange-500)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div
          className="trail-lumi-companion"
          title="Clique na Mentora Lumi!"
          {...pressable(interactWithLumi, 'Conversar com a Mentora Lumi')}
        >
          <div className="trail-lumi-3d-frame">
            <LumiAvatar alt="Mentora Lumi guiando a Trilha do Edital" />
          </div>
          <div className="trail-lumi-mini-speech" aria-live="polite">
            {speeches[speechIdx]}
          </div>
        </div>

        {trailNodes.map((node) => {
          const isChest = node.action.type === 'chest'
          const caption = isChest && chestOpened ? '🎁 Baú resgatado • volta amanhã' : node.caption

          return (
            <div
              key={node.id}
              className={`trail-step pos-${node.pos}${node.active ? ' has-bubble' : ''}`}
            >
              <div className="node-bundle" onClick={() => handleAction(node.action)}>
                {node.active && <div className="node-start-bubble">⏱️ BATERIA 2X XP</div>}
                <button
                  type="button"
                  className={`zig-node-btn ${node.kind}`}
                  aria-label={node.ariaLabel}
                >
                  {node.active && <span className="zig-node-ring" />}
                  {node.icon}
                </button>
                <span className="zig-node-caption">{caption}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { flashcards, weakPoints } from '../data/errorNotebook'

export default function PracticePage() {
  const navigate = useNavigate()
  const [flipped, setFlipped] = useState<Set<string>>(new Set())

  function toggleCard(id: string) {
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section className="app-screen active" id="screen-practice" aria-label="Caderno de Erros e Flashcards">
      <div className="screen-title-row">
        <div>
          <h1 className="screen-heading">🎯 Caderno de Erros &amp; Lei Seca</h1>
          <p className="screen-sub">
            Elimine as pegadinhas mais cobradas pelas bancas e memorize artigos-chave
          </p>
        </div>
      </div>

      <div className="practice-hero-banner">
        <div className="practice-hero-lumi">
          <img src="/assets/lumi-coach.jpg" alt="Lumi Mentora" />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '0.74rem',
              fontWeight: 900,
              color: 'var(--orange-400)',
              textTransform: 'uppercase',
            }}
          >
            🦊 Raio-X das Bancas pela Lumi
          </div>
          <div style={{ fontSize: '0.96rem', fontWeight: 800, marginTop: 4 }}>
            "Separei {weakPoints.length} pegadinhas clássicas de prova e {flashcards.length}{' '}
            flashcards de memorização rápida para você não cair no dia do concurso!"
          </div>
          <button
            type="button"
            className="primary-3d-btn"
            style={{ marginTop: 12, width: 'auto' }}
            onClick={() => navigate('/quiz', { state: { startIndex: 0 } })}
          >
            ⏱️ Treinar Questões com Cronômetro (2x XP)
          </button>
        </div>
      </div>

      <div className="section-block-title">
        <span>⚠️ Pegadinhas Clássicas de Prova (Revisão)</span>
        <span style={{ color: 'var(--orange-400)' }}>Alta Incidência</span>
      </div>

      {weakPoints.map((wp) => (
        <div key={wp.id} className="weak-point-card">
          <div className="wp-top">
            <span style={{ fontWeight: 900, fontSize: '0.95rem' }}>{wp.title}</span>
            <span className="wp-badge-err">{wp.badge}</span>
          </div>
          <div className="wp-compare-grid">
            <div className="wp-box-wrong">
              ❌ <strong>Pegadinha da Banca:</strong> {wp.trap}
            </div>
            <div className="wp-box-right">
              ✅ <strong>Gabarito Lumi:</strong> {wp.answer}
            </div>
          </div>
        </div>
      ))}

      <div className="section-block-title">
        <span>🃏 Flashcards de Véspera de Prova (Clique para Virar)</span>
        <span style={{ color: 'var(--emerald-400)' }}>Memorização Ativa</span>
      </div>

      <div className="flashcards-carousel">
        {flashcards.map((card) => {
          const isFlipped = flipped.has(card.id)
          return (
            <div
              key={card.id}
              className={`macro-flashcard${isFlipped ? ' flipped' : ''}`}
              onClick={() => toggleCard(card.id)}
            >
              {isFlipped ? (
                <>
                  <div style={{ fontSize: '0.82rem', fontWeight: 900, color: 'var(--emerald-400)' }}>
                    {card.backTitle}
                  </div>
                  <div
                    style={{
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      lineHeight: 1.35,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {card.backText}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '2rem' }}>{card.icon}</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 900 }}>{card.frontLabel}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    Clique p/ virar
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
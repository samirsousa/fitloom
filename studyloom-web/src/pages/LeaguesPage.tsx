import { Fragment } from 'react'
import {
  LEAGUE_NAME,
  LEAGUE_WEEK,
  NEXT_LEAGUE_NAME,
  PROMOTION_SLOTS,
} from '../data/leagueRivals'
import { rankMedal, useLeague } from '../hooks/useLeague'

export default function LeaguesPage() {
  const { entries, myRank, xpToPromotion } = useLeague()

  let headline = `Você está em #${myRank} na Zona de Nomeação!`
  let hint = 'Responda questões abaixo do tempo limite para ganhar 2x XP e assumir o 1º lugar!'
  if (myRank === 1) {
    headline = 'Você lidera a Zona de Nomeação!'
    hint = 'Mantenha o ritmo: responda dentro do tempo para ampliar a vantagem.'
  } else if (myRank > PROMOTION_SLOTS) {
    headline = `Você está em #${myRank}. Faltam ${xpToPromotion} XP para a zona de promoção!`
    hint = 'Responda questões abaixo do tempo limite para ganhar 2x XP e subir no ranking!'
  }

  return (
    <section className="app-screen active" id="screen-leagues" aria-label="Ligas semanais de concurseiros">
      <div className="screen-title-row">
        <div>
          <h1 className="screen-heading">🏆 {LEAGUE_NAME}</h1>
          <p className="screen-sub">
            Os Top {PROMOTION_SLOTS} concurseiros sobem para a {NEXT_LEAGUE_NAME} ao final da
            semana!
          </p>
        </div>
        <span className="story-xp-pill">Semana #{LEAGUE_WEEK}</span>
      </div>

      <div className="league-banner-card">
        <div className="league-trophy-icon">🏆</div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '0.74rem',
              fontWeight: 900,
              color: '#FBBF24',
              textTransform: 'uppercase',
            }}
          >
            🎁 Recompensa da Liga Studyloom
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#fff', marginTop: 3 }}>
            {headline}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: 4 }}>{hint}</div>
        </div>
      </div>

      <div className="leaderboard-list">
        {entries.map((entry, i) => {
          const rank = i + 1
          return (
            <Fragment key={entry.id}>
              <div className={`leader-row${entry.isMe ? ' is-me' : ''}`}>
                <div className="leader-rank">{rankMedal(rank)}</div>
                <div className="leader-avatar">{entry.avatar}</div>
                <div className="leader-info">
                  <div className="leader-name">
                    {entry.name}
                    {entry.isMe && ' (Você)'}{' '}
                    {entry.isPro && (
                      <span style={{ color: 'var(--gold-500)', fontSize: '0.72rem' }}>
                        💎 PRO
                      </span>
                    )}
                  </div>
                  <div className="leader-streak">
                    🔥 {entry.streak} dias de {entry.accuracy ? 'edital' : 'ofensiva'}
                    {entry.accuracy ? ` • ${entry.accuracy}% acerto` : ''}
                  </div>
                </div>
                <div className="leader-xp">{entry.xp.toLocaleString('pt-BR')} XP</div>
              </div>

              {rank === PROMOTION_SLOTS && (
                <div className="promo-zone-divider">
                  ▲ ZONA DE PROMOÇÃO PARA {NEXT_LEAGUE_NAME.toUpperCase()} ▲
                </div>
              )}
            </Fragment>
          )
        })}
      </div>
    </section>
  )
}
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../../store/useGameStore'
import { LEAGUE_NAME, PROMOTION_SLOTS } from '../../data/leagueRivals'
import { careerById } from '../../data/careers'
import { rankMedal, useLeague } from '../../hooks/useLeague'
import LumiAvatar from '../lumi/LumiAvatar'

export default function RightPanel() {
  const navigate = useNavigate()
  const { careerId, streak, hearts, totalXp, dailyXp, dailyXpGoal, isPro } = useGameStore()
  const dailyPct = Math.min(100, Math.round((dailyXp / dailyXpGoal) * 100))
  const { myRank, xpToPromotion } = useLeague()

  return (
    <aside className="right-widgets-panel" aria-label="Estatísticas e Ligas de Concurseiros">
      <div className="top-stats-bar">
        <div className="stat-chip streak" title="Dias seguidos estudando o edital">
          <span className="flame-animated">🔥</span>
          <span>{streak}</span>
        </div>
        <div className="stat-chip xp" onClick={() => navigate('/ligas')} title="Total de XP">
          <span>⚡</span>
          <span>{totalXp.toLocaleString('pt-BR')}</span>
        </div>
        <div className="stat-chip hearts" title="Vidas restantes">
          <span className="heart-pulse">❤️</span>
          <span>{isPro ? '∞' : hearts}</span>
        </div>
      </div>

      <div
        className="side-widget-card"
        style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.14), rgba(180, 83, 9, 0.2))',
          borderColor: 'var(--gold-500)',
        }}
      >
        <div className="widget-header">
          <span className="widget-title" style={{ color: 'var(--gold-500)' }}>
            💎 Studyloom Pro
          </span>
        </div>
        {isPro ? (
          <div style={{ fontSize: '0.8rem', fontWeight: 700, lineHeight: 1.35 }}>
            ✅ Pro ativo: <strong>vidas ilimitadas</strong> e Farda de Auditor liberadas.
          </div>
        ) : (
          <>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, lineHeight: 1.35 }}>
              Estude com <strong>vidas ilimitadas</strong> e libere a Farda de Auditor da Lumi.
            </div>
            <button
              type="button"
              className="primary-3d-btn gold"
              style={{ padding: '10px 14px', fontSize: '0.78rem' }}
              onClick={() => navigate('/pro')}
            >
              Conhecer os planos ➔
            </button>
          </>
        )}
      </div>

      <div className="side-widget-card">
        <div className="widget-header">
          <span className="widget-title">🦊 Mentora Lumi</span>
        </div>

        <div className="lumi-coach-widget-row">
          <div className="lumi-widget-avatar">
            <LumiAvatar alt="Mascote Lumi" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.84rem', fontWeight: 800, lineHeight: 1.32 }}>
              "Responder rápido ativa o bônus de agilidade nas questões!"
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: 'var(--emerald-400)',
                fontWeight: 800,
                marginTop: 4,
              }}
            >
              Foco: {careerById(careerId).label}
            </div>
          </div>
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--text-secondary)',
              marginBottom: 6,
            }}
          >
            <span>Meta diária do edital</span>
            <span>
              {dailyXp} / {dailyXpGoal} XP
            </span>
          </div>
          <div className="xp-progress-track">
            <div className="xp-progress-fill" style={{ width: `${dailyPct}%` }} />
          </div>
        </div>
      </div>

      <div className="side-widget-card">
        <div className="widget-header">
          <span className="widget-title">🏆 {LEAGUE_NAME}</span>
          <button type="button" className="widget-link-btn" onClick={() => navigate('/ligas')}>
            Ver ranking
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'rgba(245, 158, 11, 0.16)',
              border: '2px solid #F59E0B',
              display: 'grid',
              placeItems: 'center',
              fontSize: '1.5rem',
            }}
          >
            {rankMedal(myRank)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 900 }}>Você está em #{myRank} lugar</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {myRank <= PROMOTION_SLOTS
                ? 'Zona de promoção para a próxima liga'
                : `Faltam ${xpToPromotion} XP para a zona de promoção`}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
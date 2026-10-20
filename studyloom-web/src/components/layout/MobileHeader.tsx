import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../../store/useGameStore'

export default function MobileHeader() {
  const navigate = useNavigate()
  const { streak, hearts, totalXp, isPro, toggleTheme } = useGameStore()

  return (
    <header className="mobile-top-header" aria-label="Cabeçalho Mobile Studyloom">
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <div className="brand-icon-3d" style={{ width: 32, height: 32, fontSize: '1rem' }}>
          S
        </div>
        <div className="brand-wordmark" style={{ fontSize: '1.25rem' }}>
          Study<span>loom</span>
        </div>
      </div> 

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div className="stat-chip streak">
          <span className="flame-animated">🔥</span>
          <span>{streak}</span>
        </div>
        <div className="stat-chip xp" onClick={() => navigate('/ligas')}>
          <span>⚡</span>
          <span>{totalXp.toLocaleString('pt-BR')}</span>
        </div>
        <div className="stat-chip hearts">
          <span className="heart-pulse">❤️</span>
          <span>{isPro ? '∞' : hearts}</span>
        </div>
        <button type="button" className="stat-chip" onClick={toggleTheme} title="Alternar tema">
          🌓
        </button>
      </div>
    </header>
  )
}
import { useLocation, useNavigate } from 'react-router-dom'
import { useGameStore } from '../../store/useGameStore'
import { useIntroStore } from '../../store/useIntroStore'
import { sidebarItems } from './navItems'
import { pressable } from '../../utils/a11y'

export default function Sidebar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const theme = useGameStore((s) => s.theme)
  const toggleTheme = useGameStore((s) => s.toggleTheme)
  const soundEnabled = useGameStore((s) => s.soundEnabled)
  const toggleSound = useGameStore((s) => s.toggleSound)
  const replayIntro = useIntroStore((s) => s.replay)

  return (
    <aside className="left-sidebar" aria-label="Menu Principal GoLumi">
      <div>
        <div className="sidebar-brand" {...pressable(() => navigate('/'), 'GoLumi, ir para a Trilha')}>
          <div className="brand-icon-3d">G</div>
          <div className="brand-wordmark">
            Go<span>Lumi</span>
          </div>
        </div>

        <nav className="sidebar-nav-list">
          {sidebarItems.map((item) => {
            const active = item.matches.includes(pathname)
            return (
              <button
                key={item.to}
                type="button"
                className={['sidebar-nav-btn', item.className, active && 'active']
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => navigate(item.to)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="sidebar-footer-actions">
        <button type="button" className="sidebar-util-btn" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️ Alternar para Light Mode' : '🌙 Alternar para Dark Mode'}
        </button>
        <button type="button" className="sidebar-util-btn" onClick={toggleSound} aria-pressed={soundEnabled}>
          {soundEnabled ? '🔊 Sons e vibração: ligados' : '🔇 Sons e vibração: desligados'}
        </button>
        {/* Volta para a Trilha antes, para não deixar o cronômetro da bateria correndo por baixo */}
        <button
          type="button"
          className="sidebar-util-btn"
          onClick={() => {
            navigate('/')
            replayIntro()
          }}
        >
          🎬 Rever abertura
        </button>
      </div>
    </aside>
  )
}
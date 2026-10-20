import { useLocation, useNavigate } from 'react-router-dom'
import { useGameStore } from '../../store/useGameStore'
import { sidebarItems } from './navItems'

export default function Sidebar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const theme = useGameStore((s) => s.theme)
  const toggleTheme = useGameStore((s) => s.toggleTheme)

  return (
    <aside className="left-sidebar" aria-label="Menu Principal Studyloom">
      <div>
        <div className="sidebar-brand" onClick={() => navigate('/')}>
          <div className="brand-icon-3d">S</div>
          <div className="brand-wordmark">
            Study<span>loom</span>
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
      </div>
    </aside>
  )
}
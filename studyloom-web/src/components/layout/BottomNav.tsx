import { useLocation, useNavigate } from 'react-router-dom'
import { bottomItems } from './navItems'

export default function BottomNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="bottom-nav" aria-label="Navegação Inferior Mobile GoLumi">
      {bottomItems.map((item) => (
        <button
          key={item.to}
          type="button"
          className={`nav-tab${item.matches.includes(pathname) ? ' active' : ''}`}
          onClick={() => navigate(item.to)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
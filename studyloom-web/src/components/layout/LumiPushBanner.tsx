import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../../store/useGameStore'
import { useLumiPush } from '../../store/useLumiPush'
import LumiAvatar from '../lumi/LumiAvatar'

export default function LumiPushBanner() {
  const navigate = useNavigate()
  const streak = useGameStore((s) => s.streak)
  const { message, visible, hide } = useLumiPush()

  function handleClick() {
    hide()
    navigate('/quiz', { state: { startIndex: 0 } })
  }

  return (
    <div
      className={`lumi-push-banner${visible ? ' visible' : ''}`}
      onClick={handleClick}
      role="status"
      aria-live="polite"
    >
      <div className="push-avatar-wrap">
        <LumiAvatar alt="Lumi" />
      </div>
      <div className="push-content">
        <div className="push-meta">
          <span>🦊 LUMI • STUDYLOOM CONCURSOS</span>
          <span>🔥 {streak} DIAS</span>
        </div>
        <p className="push-text">{message}</p>
      </div>
    </div>
  )
}
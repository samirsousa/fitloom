import { useNavigate } from 'react-router-dom'
import { houseAds, type AdPlacement } from '../../data/ads'
import { useGameStore } from '../../store/useGameStore'

interface Props {
  placement: AdPlacement
}

// Espaço de anúncio do plano gratuito. Assinantes Pro não veem anúncios.
// TODO backend: trocar o anúncio da casa pela rede de anúncios (AdSense) só aqui,
// depois de ter domínio próprio, política de privacidade e consentimento conforme a LGPD.
export default function AdSlot({ placement }: Props) {
  const navigate = useNavigate()
  const isPro = useGameStore((s) => s.isPro)
  if (isPro) return null

  const ad = houseAds[placement]

  return (
    <aside className="ad-slot" aria-label="Publicidade">
      <div className="ad-slot-label">Publicidade</div>
      <div className="ad-slot-body">
        <div className="ad-slot-icon">{ad.icon}</div>
        <div style={{ flex: 1 }}>
          <div className="ad-slot-title">{ad.title}</div>
          <div className="ad-slot-text">{ad.text}</div>
        </div>
      </div>
      <div className="ad-slot-actions">
        <button type="button" className="widget-link-btn" onClick={() => navigate(ad.to)}>
          {ad.cta} ➔
        </button>
        <button type="button" className="ad-slot-remove" onClick={() => navigate('/pro')}>
          Remover anúncios
        </button>
      </div>
    </aside>
  )
}

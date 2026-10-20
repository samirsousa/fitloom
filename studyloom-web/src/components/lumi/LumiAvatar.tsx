import { ACCESSORIES_ENABLED } from '../../data/wardrobe'
import { useLumiLook } from '../../store/useLumiStore'

interface Props {
  alt: string
  // Óculos e fones só aparecem nas vitrines grandes (Loja e Perfil), como no protótipo
  withAccessories?: boolean
}

// Lumi com a fantasia e a pelagem equipadas. A moldura fica no componente pai.
export default function LumiAvatar({ alt, withAccessories = false }: Props) {
  const look = useLumiLook()

  return (
    <>
      <img src={look.imgPath} alt={alt} className={look.furClass} />
      {withAccessories && ACCESSORIES_ENABLED && (
        <div className="lumi-acc-layer">
          <svg
            className={`lumi-acc-headphones${look.showHeadphones ? ' visible' : ''}`}
            viewBox="0 0 120 120"
            fill="none"
          >
            <path d="M22 60 C22 24, 98 24, 98 60" stroke="#0D9488" strokeWidth="7" strokeLinecap="round" />
            <path d="M26 56 C26 27, 94 27, 94 56" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="13" y="48" width="14" height="26" rx="7" fill="#0F172A" stroke="#10B981" strokeWidth="3" />
            <rect x="93" y="48" width="14" height="26" rx="7" fill="#0F172A" stroke="#10B981" strokeWidth="3" />
          </svg>
          <svg
            className={`lumi-acc-glasses${look.showGlasses ? ' visible' : ''}`}
            viewBox="0 0 120 120"
            fill="none"
          >
            <rect x="27" y="45" width="28" height="19" rx="6" fill="rgba(15, 23, 42, 0.28)" stroke="#1E293B" strokeWidth="3.5" />
            <rect x="65" y="45" width="28" height="19" rx="6" fill="rgba(15, 23, 42, 0.28)" stroke="#1E293B" strokeWidth="3.5" />
            <rect x="27" y="45" width="28" height="19" rx="6" stroke="#FBBF24" strokeWidth="1.5" />
            <rect x="65" y="45" width="28" height="19" rx="6" stroke="#FBBF24" strokeWidth="1.5" />
            <line x1="55" y1="53" x2="65" y2="53" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </>
  )
}

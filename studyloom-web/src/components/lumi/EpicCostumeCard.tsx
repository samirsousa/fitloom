import type { EpicCostume } from '../../data/wardrobe'
import { useEpicCostumes } from '../../hooks/useEpicCostumes'

interface Props {
  costume: EpicCostume
  // Prefixo dos ids, como no protótipo: 'shop' na Loja e 'prof' no Perfil
  idPrefix: string
}

export default function EpicCostumeCard({ costume, idPrefix }: Props) {
  const { isEquipped, equip, buttonLabel } = useEpicCostumes()
  const equipped = isEquipped(costume)

  return (
    <div
      className={`epic-costume-card${equipped ? ' equipped' : ''}`}
      id={`${idPrefix}-epic-card-${costume.id}`}
    >
      <div>
        <div className="epic-costume-thumb">
          <img src={costume.imgPath} alt={costume.imgAlt} />
          <span className={`epic-tier-badge ${costume.tierClass}`}>{costume.tierBadge}</span>
        </div>
        <div className="epic-costume-title" style={{ marginTop: 10 }}>
          {costume.cardTitle}
        </div>
        <div className="epic-costume-desc" style={{ marginTop: 4 }}>
          {costume.cardDesc}
        </div>
      </div>
      <div>
        <div className="epic-unlock-req" style={{ marginBottom: 6 }}>
          {costume.unlockReq}
        </div>
        <button
          type="button"
          className={`epic-action-btn${costume.unlock.type === 'pro' ? ' pro-btn' : ''}${equipped ? ' equipped-btn' : ''}`}
          onClick={() => equip(costume)}
        >
          {buttonLabel(costume)}
        </button>
      </div>
    </div>
  )
}

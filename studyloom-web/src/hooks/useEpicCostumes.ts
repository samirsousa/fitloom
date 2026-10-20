import { useNavigate } from 'react-router-dom'
import type { EpicCostume } from '../data/wardrobe'
import { PROMOTION_SLOTS } from '../data/leagueRivals'
import { useLeague } from './useLeague'
import { useGameStore } from '../store/useGameStore'
import { useLumiStore } from '../store/useLumiStore'
import { useLumiPush } from '../store/useLumiPush'

// Regras de desbloqueio das fantasias épicas, compartilhadas entre Loja e Perfil
export function useEpicCostumes() {
  const navigate = useNavigate()
  const totalXp = useGameStore((s) => s.totalXp)
  const isPro = useGameStore((s) => s.isPro)
  const spendXp = useGameStore((s) => s.spendXp)
  const { activeEpicId, ownedEpics, equipEpic, markEpicOwned } = useLumiStore()
  const { myRank, xpToPromotion } = useLeague()
  const showPush = useLumiPush((s) => s.show)

  function isEquipped(costume: EpicCostume) {
    return activeEpicId === costume.id
  }

  function equip(costume: EpicCostume) {
    if (isEquipped(costume)) return

    const { unlock } = costume
    if (unlock.type === 'xp' && !ownedEpics.includes(costume.id)) {
      if (!spendXp(unlock.cost)) {
        showPush(`⚡ Faltam ${unlock.cost - totalXp} XP para desbloquear ${costume.cardTitle}. Resolva mais uma bateria!`)
        return
      }
      markEpicOwned(costume.id)
    } else if (unlock.type === 'league' && myRank > PROMOTION_SLOTS) {
      showPush(`🏆 A Toga de Magistrado é da zona de promoção. Faltam ${xpToPromotion} XP para o top ${PROMOTION_SLOTS} da liga!`)
      return
    } else if (unlock.type === 'pro' && !isPro) {
      showPush('💎 A Farda de Auditor é exclusiva do Studyloom Pro. Conheça os planos!')
      navigate('/pro')
      return
    }

    equipEpic(costume.id)
    showPush(costume.pushMsg)
  }

  function buttonLabel(costume: EpicCostume) {
    if (isEquipped(costume)) return '✅ Fantasia Épica Equipada'
    if (costume.unlock.type === 'xp' && !ownedEpics.includes(costume.id)) {
      return `⚡ Desbloquear & Equipar (${costume.unlock.cost} XP)`
    }
    return costume.equipLabel
  }

  return { isEquipped, equip, buttonLabel }
}

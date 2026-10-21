import type { ProPlanId } from '../data/proPlans'
import { useGameStore } from '../store/useGameStore'
import { useLumiStore } from '../store/useLumiStore'
import { useLumiPush } from '../store/useLumiPush'

// Assinatura e cancelamento do Pro, que mexem no jogo e no avatar ao mesmo tempo
export function useProSubscription() {
  const isPro = useGameStore((s) => s.isPro)
  const proPlan = useGameStore((s) => s.proPlan)
  const activatePro = useGameStore((s) => s.activatePro)
  const cancelPro = useGameStore((s) => s.cancelPro)
  const showPush = useLumiPush((s) => s.show)

  // TODO backend: abrir o pagamento (Pix ou cartão) e ativar só após a confirmação
  function subscribe(plan: ProPlanId) {
    activatePro(plan)
    useLumiStore.getState().equipEpic('auditor')
    // Etapa 5: som 'fanfare' e partículas de confete e corações, como no protótipo
    showPush('💎 Bem-vindo ao Studyloom Pro! Vidas ilimitadas (❤️ ∞) e a Farda de Auditor / Fiscal foram ativadas!')
  }

  function cancel() {
    cancelPro()
    // A farda é exclusiva do Pro, então a Lumi volta para a pose base
    const lumi = useLumiStore.getState()
    if (lumi.activeEpicId === 'auditor') lumi.equipBasePose(lumi.basePoseKey)
    showPush('Assinatura Pro cancelada. Suas vidas voltam a valer e a Lumi guardou a Farda de Auditor.')
  }

  return { isPro, proPlan, subscribe, cancel }
}

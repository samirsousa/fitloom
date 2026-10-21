import { useState } from 'react'
import { epicCostumes } from '../data/wardrobe'
import {
  annualSavings,
  formatBrl,
  proDiffs,
  proPlans,
  proUpcoming,
  type ProPlanId,
} from '../data/proPlans'
import { useProSubscription } from '../hooks/useProSubscription'
import { useFeedback } from '../hooks/useFeedback'

const auditor = epicCostumes.find((c) => c.id === 'auditor')!

export default function ProPage() {
  const { isPro, proPlan, subscribe, cancel } = useProSubscription()
  const [selectedPlan, setSelectedPlan] = useState<ProPlanId>('annual')
  const fx = useFeedback()

  function selectPlan(id: ProPlanId) {
    if (id === selectedPlan) return
    fx('tap')
    setSelectedPlan(id)
  }
  const selected = proPlans.find((p) => p.id === selectedPlan)!
  const activePlan = proPlans.find((p) => p.id === proPlan)

  return (
    <section className="app-screen active" id="screen-pro" aria-label="Assinatura Studyloom Pro">
      <div className="pro-hero-card">
        <div className="pro-hero-lumi">
          <img src={auditor.imgPath} alt={auditor.imgAlt} />
        </div>
        <div>
          <span className="pro-super-pill">💎 STUDYLOOM PRO</span>
          <h1 style={{ fontSize: '1.55rem', fontWeight: 900, lineHeight: 1.2 }}>
            Estude sem travar: vidas ilimitadas e a Farda de Auditor da Lumi.
          </h1>
        </div>
      </div>

      <div className="section-block-title">
        <span>🔄 O que muda no Pro</span>
      </div>
      <div className="pro-compare-box">
        {proDiffs.map((d) => (
          <div key={d.label} className="pro-diff-row">
            <span className="pro-diff-icon">{d.icon}</span>
            <span>{d.label}</span>
            <span className="pro-diff-change">
              {d.free} ➔ <strong>{d.pro}</strong>
            </span>
          </div>
        ))}
      </div>

      {isPro ? (
        <>
          <div className="pro-active-card">
            ✅ Studyloom Pro ativo{activePlan && ` • ${activePlan.label}`}
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginTop: 4,
              }}
            >
              Vidas ilimitadas e Farda de Auditor / Fiscal liberadas.
            </div>
          </div>
          <button type="button" className="pro-cancel-link" onClick={cancel}>
            Cancelar assinatura (simulação)
          </button>
        </>
      ) : (
        <>
          <div className="pro-plans-grid">
            {proPlans.map((plan) => (
              <div
                key={plan.id}
                className={`pro-plan-card${plan.id === selectedPlan ? ' selected' : ''}`}
                id={`plan-card-${plan.id}`}
                role="radio"
                aria-checked={plan.id === selectedPlan}
                tabIndex={0}
                onClick={() => selectPlan(plan.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    selectPlan(plan.id)
                  }
                }}
              >
                {plan.id === 'annual' && (
                  <span className="pro-plan-ribbon">
                    Economia de R$ {annualSavings().toLocaleString('pt-BR')} no ano
                  </span>
                )}
                <div
                  style={{
                    fontSize: '0.76rem',
                    fontWeight: 900,
                    color: plan.id === selectedPlan ? 'var(--gold-600)' : 'var(--text-secondary)',
                    textTransform: 'uppercase',
                  }}
                >
                  {plan.label}
                </div>
                <div style={{ fontSize: '1.45rem', fontWeight: 900, marginTop: 4 }}>
                  {formatBrl(plan.monthlyPrice)}{' '}
                  <span
                    style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}
                  >
                    / mês
                  </span>
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  {plan.billingNote}
                </div>
              </div>
            ))}
          </div>

          {/* TODO backend: aqui entram o checkout com Pix e cartão */}
          <button
            type="button"
            className="btn-vamos-iniciar pro-gold"
            id="btn-activate-pro"
            onClick={() => subscribe(selectedPlan)}
          >
            <span>💎 {selected.ctaLabel}</span>
          </button>
          <p className="pro-simulation-note">Simulação: nenhuma cobrança é feita.</p>
        </>
      )}

      <p className="pro-upcoming-line">
        <span className="pro-soon-pill">EM BREVE</span>{' '}
        {new Intl.ListFormat('pt-BR').format(proUpcoming)}. Ainda não fazem parte da assinatura.
      </p>
    </section>
  )
}

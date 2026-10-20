import { useNavigate } from 'react-router-dom'
import EpicCostumeCard from '../components/lumi/EpicCostumeCard'
import LumiAvatar from '../components/lumi/LumiAvatar'
import {
  ACCESSORIES_ENABLED,
  epicCostumes,
  MAX_STREAK_FREEZES,
  STREAK_FREEZE_COST,
} from '../data/wardrobe'
import { HEART_REFILL_COST, MAX_HEARTS, useGameStore } from '../store/useGameStore'
import { useLumiLook } from '../store/useLumiStore'
import { useLumiPush } from '../store/useLumiPush'

export default function ShopPage() {
  const navigate = useNavigate()
  const { totalXp, hearts, isPro, streakFreezes, refillHeartsWithXp, buyStreakFreeze } =
    useGameStore()
  const look = useLumiLook()
  const showPush = useLumiPush((s) => s.show)

  function buyHearts() {
    if (isPro) {
      showPush('💎 No Studyloom Pro suas vidas já são ilimitadas!')
    } else if (hearts >= MAX_HEARTS) {
      showPush(`❤️ Suas vidas já estão cheias (${MAX_HEARTS}/${MAX_HEARTS}). Guarde o XP para depois!`)
    } else if (refillHeartsWithXp()) {
      showPush(`❤️ Vidas recarregadas (${MAX_HEARTS}/${MAX_HEARTS})! Continue resolvendo questões sem parar!`)
    } else {
      showPush(`⚡ Faltam ${HEART_REFILL_COST - totalXp} XP para recarregar as vidas.`)
    }
  }

  function buyFreeze() {
    if (streakFreezes >= MAX_STREAK_FREEZES) {
      showPush('🧊 Você já tem um Congelamento de Ofensiva ativo. Ele protege 1 dia sem estudo.')
    } else if (buyStreakFreeze()) {
      showPush('🧊 Congelamento de Ofensiva equipado! Seu Streak de estudos está blindado.')
    } else {
      showPush(`⚡ Faltam ${STREAK_FREEZE_COST - totalXp} XP para o Congelamento de Ofensiva.`)
    }
  }

  return (
    <section className="app-screen active" id="screen-shop" aria-label="Loja da Lumi">
      <div className="screen-title-row">
        <div>
          <h1 className="screen-heading">🦊 Loja &amp; Guarda-Roupas da Lumi</h1>
          <p className="screen-sub">
            Personalize seu avatar padrão Lumi 3D com estilos gratuitos, fantasias épicas e power-ups
          </p>
        </div>
        <button type="button" className="high-five-btn" onClick={() => navigate('/perfil')}>
          🎒 Abrir Guarda-Roupas no Perfil
        </button>
      </div>

      <div className="shop-lumi-showcase">
        <div className="lumi-avatar-stage-3d" id="shop-avatar-stage">
          <LumiAvatar alt="Lumi 3D na Loja" withAccessories />
          <div className="lumi-avatar-tag">{look.skinTag}</div>
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '0.74rem',
              fontWeight: 900,
              color: 'var(--orange-400)',
              textTransform: 'uppercase',
            }}
          >
            ✨ Avatar Oficial Equipado em Todo o App
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 900, marginTop: 4 }}>{look.skinTitle}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            Pelagem: {look.furLabel}
            {ACCESSORIES_ENABLED && ` • Acessório: ${look.accessoryLabel}`}
          </div>
        </div>
      </div>

      <div className="section-block-title">
        <span>👑 Fantasias Épicas da Lumi 3D (XP, Ligas &amp; Studyloom Pro)</span>
        <span style={{ color: 'var(--orange-400)' }}> Coleção Especial</span>
      </div>

      <div className="epic-costumes-grid">
        {epicCostumes.map((costume) => (
          <EpicCostumeCard key={costume.id} costume={costume} idPrefix="shop" />
        ))}
      </div>

      <div className="section-block-title">
        <span>⚡ Power-Ups de Estudo &amp; Vidas Extras</span>
      </div>

      <div className="shop-item-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div className="shop-item-icon">❤️</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '0.92rem' }}>
              Recarga Total de Vidas ({MAX_HEARTS}/{MAX_HEARTS})
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Continue resolvendo baterias sem interrupção
            </div>
          </div>
        </div>
        <button type="button" className="shop-buy-btn" onClick={buyHearts}>
          ⚡ {HEART_REFILL_COST} XP
        </button>
      </div>

      <div className="shop-item-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div className="shop-item-icon">🧊</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '0.92rem' }}>
              Congelamento de Ofensiva (Streak Freeze)
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Protege sua ofensiva caso você imprevistamente perca 1 dia
            </div>
          </div>
        </div>
        <button type="button" className="shop-buy-btn" onClick={buyFreeze}>
          {streakFreezes >= MAX_STREAK_FREEZES ? '🧊 Ativo' : `⚡ ${STREAK_FREEZE_COST} XP`}
        </button>
      </div>
    </section>
  )
}

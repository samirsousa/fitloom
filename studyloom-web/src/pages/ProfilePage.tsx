import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EpicCostumeCard from '../components/lumi/EpicCostumeCard'
import LumiAvatar from '../components/lumi/LumiAvatar'
import { achievements } from '../data/achievements'
import { careerById } from '../data/careers'
import { LEAGUE_NAME, LEAGUE_TIER } from '../data/leagueRivals'
import {
  ACCESSORY_POSE,
  accessoryOptions,
  basePoses,
  epicCostumes,
  furOptions,
  type AccessoryOption,
  type BasePose,
  type FurOption,
} from '../data/wardrobe'
import { useLeague } from '../hooks/useLeague'
import { useFeedback } from '../hooks/useFeedback'
import { useGameStore } from '../store/useGameStore'
import { useLumiLook, useLumiStore } from '../store/useLumiStore'
import { useLumiPush } from '../store/useLumiPush'
import { useIntroStore } from '../store/useIntroStore'

type WardrobeTab = 'free' | 'epic'

export default function ProfilePage() {
  const navigate = useNavigate()
  const replayIntro = useIntroStore((s) => s.replay)
  const soundEnabled = useGameStore((s) => s.soundEnabled)
  const toggleSound = useGameStore((s) => s.toggleSound)
  const resetProgress = useGameStore((s) => s.resetProgress)
  const { userName, careerId, streak, totalXp, isPro, answeredTotal, correctTotal } = useGameStore()
  const {
    furKey,
    accessoryKey,
    basePoseKey,
    activeEpicId,
    setFur,
    setAccessory,
    equipBasePose,
    reset: resetLumi,
  } = useLumiStore()
  const look = useLumiLook()
  const { myRank } = useLeague()
  const showPush = useLumiPush((s) => s.show)
  const fx = useFeedback()
  const [tab, setTab] = useState<WardrobeTab>('free')

  const accuracy =
    answeredTotal > 0 ? `${Math.round((correctTotal / answeredTotal) * 100)}%` : '—'

  const achievementRows = achievements.map((a) => {
    const current = a.progress.type === 'streak' ? Math.min(streak, a.progress.goal) : a.progress.current
    return { ...a, current, goal: a.progress.goal, done: current >= a.progress.goal }
  })
  const achievedCount = achievementRows.filter((a) => a.done).length

  function chooseFur(fur: FurOption) {
    setFur(fur.key)
    fx('tap')
    showPush(`🦊 Pelagem gratuita "${fur.label}" aplicada no seu avatar Lumi 3D!`)
  }

  function chooseAccessory(acc: AccessoryOption) {
    setAccessory(acc.key)
    fx('tap')
    showPush(
      acc.key === 'none'
        ? '🎒 Acessório removido da Lumi 3D.'
        : `🎒 "${acc.label}" aplicado na Lumi Padrão! Os acessórios usam a pose Padrão.`,
    )
  }

  function choosePose(pose: BasePose) {
    const hadAccessory = accessoryKey !== 'none' && pose.key !== ACCESSORY_POSE
    equipBasePose(pose.key)
    fx('tap')
    showPush(
      hadAccessory
        ? `🦊 "${pose.skinTitle}" equipado! Os acessórios só existem na pose Padrão e foram guardados.`
        : `🦊 Estilo gratuito "${pose.skinTitle}" equipado na Lumi 3D!`,
    )
  }

  // Apaga o progresso salvo neste aparelho. Tema e som ficam.
  function eraseProgress() {
    const ok = window.confirm(
      'Apagar todo o seu progresso neste aparelho? XP, ofensiva, compras e escolhas da Lumi voltam ao início, e a abertura aparece de novo. Não dá para desfazer.',
    )
    if (!ok) return
    resetProgress()
    resetLumi()
    navigate('/')
  }

  return (
    <section className="app-screen active" id="screen-profile" aria-label="Perfil do Concurseiro">
      <div className="profile-header-card">
        <div className="lumi-avatar-stage-3d" id="profile-avatar-stage">
          <LumiAvatar alt="Avatar Padrão Obrigatório: Raposa 3D Lumi" />
          <div className="lumi-avatar-tag">{look.skinTag}</div>
        </div>

        <div style={{ flex: 1 }}>
          <span className="default-avatar-pill">
            🎓 Avatar Padrão Oficial: Lumi Aprovada (Capelo &amp; Diploma)
          </span>
          <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>
            {userName} • Concurseiro Studyloom
          </div>
          <div
            style={{
              fontSize: '0.82rem',
              color: 'var(--emerald-400)',
              fontWeight: 800,
              marginTop: 3,
            }}
          >
            🛡️ {LEAGUE_NAME} • Foco: {careerById(careerId).label}
          </div>
          <div
            style={{
              fontSize: '0.76rem',
              color: 'var(--text-secondary)',
              marginTop: 4,
              fontWeight: 700,
            }}
          >
            Visual: {look.skinTitle} • Pelagem: {look.furLabel}
            {` • ${look.accessoryLabel}`}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 2 }}>
            {isPro
              ? '💎 Assinante Studyloom Pro (Vidas ∞ & Farda de Auditor)'
              : 'Plano Atual: Studyloom Gratuito'}
          </div>
        </div>
      </div>

      <div className="profile-stats-grid">
        <div className="p-stat-card">
          <span style={{ fontSize: '1.6rem' }}>🔥</span>
          <div>
            <div className="p-stat-val">{streak} Dias</div>
            <div className="p-stat-lbl">Ofensiva de Estudo</div>
          </div>
        </div>
        <div className="p-stat-card">
          <span style={{ fontSize: '1.6rem' }}>⚡</span>
          <div>
            <div className="p-stat-val">{totalXp.toLocaleString('pt-BR')} XP</div>
            <div className="p-stat-lbl">Total de XP (c/ Bônus 2x)</div>
          </div>
        </div>
        <div className="p-stat-card">
          <span style={{ fontSize: '1.6rem' }}>🏆</span>
          <div>
            <div className="p-stat-val">{LEAGUE_TIER}</div>
            <div className="p-stat-lbl">Liga Atual (#{myRank})</div>
          </div>
        </div>
        <div className="p-stat-card">
          <span style={{ fontSize: '1.6rem' }}>🎯</span>
          <div>
            <div className="p-stat-val">{accuracy}</div>
            <div className="p-stat-lbl">Taxa de Acerto nas Bancas</div>
          </div>
        </div>
      </div>

      <div className="avatar-creator-box">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <div>
            <span style={{ fontWeight: 900, fontSize: '1.02rem' }}>
              🦊 Guarda-Roupas &amp; Customização da Lumi 3D
            </span>
            <div
              style={{
                fontSize: '0.76rem',
                color: 'var(--text-secondary)',
                fontWeight: 600,
                marginTop: 2,
              }}
            >
              A raposa 3D Lumi é o seu avatar oficial! Customize cores de pelagem, acessórios de
              estudo ou equipe Fantasias Épicas.
            </div>
          </div>
          <span style={{ fontSize: '0.74rem', color: 'var(--orange-400)', fontWeight: 900 }}>
            Preview 3D Instantâneo
          </span>
        </div>

        <div className="wardrobe-tabs-bar">
          <button
            type="button"
            className={`wardrobe-tab-btn${tab === 'free' ? ' active' : ''}`}
            onClick={() => {
              fx('tap')
              setTab('free')
            }}
          >
            <span>🎒 Estilos Gratuitos (Free)</span>
          </button>
          <button
            type="button"
            className={`wardrobe-tab-btn${tab === 'epic' ? ' active' : ''}`}
            onClick={() => {
              fx('tap')
              setTab('epic')
            }}
          >
            <span>👑 Fantasias Épicas (XP / Ligas / Pro)</span>
          </button>
        </div>

        <div className={`wardrobe-pane${tab === 'free' ? ' active' : ''}`}>
          <div className="creator-row" style={{ marginTop: 4 }}>
            <div className="creator-row-label">
              Cores de Pelagem da Lumi 3D{' '}
              <span className="free-tag-pill">✓ 100% Grátis • Desbloqueado</span>
            </div>
            <div className="creator-swatches">
              {furOptions.map((fur) => (
                <button
                  key={fur.key}
                  type="button"
                  className={`swatch-btn${furKey === fur.key ? ' active' : ''}`}
                  onClick={() => chooseFur(fur)}
                >
                  <span className="fur-swatch-dot" style={{ background: fur.swatch }} />
                  <span>{fur.buttonLabel}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="creator-row">
            <div className="creator-row-label">
              Acessórios Simples de Concurseiro (na pose Padrão){' '}
              <span className="free-tag-pill">✓ 100% Grátis • Desbloqueado</span>
            </div>
            <div className="creator-swatches">
              {accessoryOptions.map((acc) => (
                <button
                  key={acc.key}
                  type="button"
                  className={`swatch-btn${accessoryKey === acc.key ? ' active' : ''}`}
                  onClick={() => chooseAccessory(acc)}
                >
                  {acc.buttonLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="creator-row">
            <div className="creator-row-label">
              Visual Base &amp; Poses de Aprovação (Capelo &amp; Diploma){' '}
              <span className="free-tag-pill">✓ 100% Grátis • Desbloqueado</span>
            </div>
            <div className="creator-swatches">
              {basePoses.map((pose) => (
                <button
                  key={pose.key}
                  type="button"
                  // Com uma fantasia épica equipada, nenhuma pose base fica marcada
                  className={`swatch-btn${!activeEpicId && basePoseKey === pose.key ? ' active' : ''}`}
                  onClick={() => choosePose(pose)}
                >
                  {pose.buttonLabel}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`wardrobe-pane${tab === 'epic' ? ' active' : ''}`}>
          <div className="epic-costumes-grid">
            {epicCostumes.map((costume) => (
              <EpicCostumeCard key={costume.id} costume={costume} idPrefix="prof" />
            ))}
          </div>
        </div>
      </div>

      <div className="section-block-title">
        <span>🏅 Medalhas e Conquistas do Concurseiro</span>
        <span style={{ color: 'var(--emerald-400)' }}>
          {achievedCount} / {achievementRows.length} Conquistadas
        </span>
      </div>

      {achievementRows.map((a) => (
        <div key={a.id} className="achievement-card">
          <div className="ach-medal">{a.medal}</div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.9rem',
                fontWeight: 900,
              }}
            >
              <span>{a.title}</span>
              <span style={{ color: a.done ? 'var(--emerald-400)' : 'var(--orange-400)' }}>
                {a.done ? 'Nível MAX' : `${a.current} / ${a.goal}`}
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{a.desc}</div>
            <div className="ach-progress-track">
              <div
                className="ach-progress-fill"
                style={{ width: `${Math.round((a.current / a.goal) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      ))}

      {/* No mobile a barra lateral some, então estes controles ficam aqui também */}
      <button
        type="button"
        className="sidebar-util-btn"
        style={{ marginTop: 18 }}
        onClick={toggleSound}
        aria-pressed={soundEnabled}
      >
        {soundEnabled ? '🔊 Sons e vibração: ligados' : '🔇 Sons e vibração: desligados'}
      </button>
      <button
        type="button"
        className="sidebar-util-btn"
        style={{ marginTop: 10 }}
        onClick={() => {
          navigate('/')
          replayIntro()
        }}
      >
        🎬 Rever abertura
      </button>
      <button
        type="button"
        className="sidebar-util-btn"
        style={{ marginTop: 10, color: 'var(--heart-red)' }}
        onClick={eraseProgress}
      >
        🗑️ Apagar meu progresso
      </button>
    </section>
  )
}

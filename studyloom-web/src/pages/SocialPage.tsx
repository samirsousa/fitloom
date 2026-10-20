import { useState } from 'react'
import { communityItems, toneStyles } from '../data/community'
import { useLumiPush } from '../store/useLumiPush'

export default function SocialPage() {
  const showPush = useLumiPush((s) => s.show)
  const [sent, setSent] = useState<Set<string>>(new Set())

  function sendHighFive(id: string, friend: string) {
    setSent((prev) => new Set(prev).add(id))
    showPush(
      `🙌 Você enviou incentivo de estudo para ${friend}! Duplas de estudo mantêm a constância até o edital!`,
    )
  }

  return (
    <section className="app-screen active" id="screen-social" aria-label="Comunidade de estudos">
      <div className="screen-title-row">
        <div>
          <h1 className="screen-heading">❤️ Comunidade Studyloom</h1>
          <p className="screen-sub">
            Parceiros de estudo em dupla e marcos de questões resolvidas
          </p>
        </div>
      </div>

      {communityItems.map((item) => {
        const done = sent.has(item.id)
        return (
          <div key={item.id} className="friend-streak-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="leader-avatar">{item.avatar}</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: '0.95rem' }}>{item.title}</div>
                <div style={{ fontSize: '0.78rem', marginTop: 2, ...toneStyles[item.tone] }}>
                  {item.detail}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="high-five-btn"
              disabled={done}
              onClick={() => sendHighFive(item.id, item.friend)}
            >
              {done ? '🔥 Incentivo Enviado!' : item.actionLabel}
            </button>
          </div>
        )
      })}
    </section>
  )
}
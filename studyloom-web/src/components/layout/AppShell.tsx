import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useGameStore } from '../../store/useGameStore'
import { useLumiPush } from '../../store/useLumiPush'
import MobileHeader from './MobileHeader'
import Sidebar from './Sidebar'
import RightPanel from './RightPanel'
import BottomNav from './BottomNav'
import LumiPushBanner from './LumiPushBanner'
import IntroOverlay from '../onboarding/IntroOverlay'
import ParticlesCanvas from '../fx/ParticlesCanvas'
import { unlockAudio } from '../../hooks/useSound'

export default function AppShell() {
  const theme = useGameStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Virada de dia ao abrir o app e quando a aba volta a ficar visível
  // (cobre quem deixa o app aberto de um dia para o outro)
  useEffect(() => {
    function sync() {
      if (document.visibilityState !== 'visible') return
      if (useGameStore.getState().syncDay()) {
        const { streak } = useGameStore.getState()
        useLumiPush
          .getState()
          .show(`🧊 Você ficou um dia sem estudar, mas o Congelamento protegeu sua ofensiva de ${streak} dias! Resolva uma bateria hoje.`)
      }
    }
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])

  // Libera o áudio no primeiro gesto (exigência do iOS). Continua ouvindo porque
  // o iOS pode suspender o áudio de novo depois de uma ligação ou troca de app.
  useEffect(() => {
    window.addEventListener('pointerdown', unlockAudio, true)
    window.addEventListener('keydown', unlockAudio, true)
    return () => {
      window.removeEventListener('pointerdown', unlockAudio, true)
      window.removeEventListener('keydown', unlockAudio, true)
    }
  }, [])

  return (
    <>
      <LumiPushBanner />
      <MobileHeader />
      <div className="web-app-shell">
        <Sidebar />
        <main className="main-content-area">
          <div className="content-column-inner">
            <Outlet />
          </div>
        </main>
        <RightPanel />
      </div>
      <BottomNav />
      <IntroOverlay />
      <ParticlesCanvas />
    </>
  )
}
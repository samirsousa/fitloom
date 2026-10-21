import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useGameStore } from '../../store/useGameStore'
import MobileHeader from './MobileHeader'
import Sidebar from './Sidebar'
import RightPanel from './RightPanel'
import BottomNav from './BottomNav'
import LumiPushBanner from './LumiPushBanner'
import IntroOverlay from '../onboarding/IntroOverlay'

export default function AppShell() {
  const theme = useGameStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

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
    </>
  )
}
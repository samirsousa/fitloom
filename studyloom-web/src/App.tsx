import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import TrailPage from './pages/TrailPage'

// A Trilha é a tela inicial e vai no pacote principal. As demais carregam quando abertas.
const PracticePage = lazy(() => import('./pages/PracticePage'))
const LeaguesPage = lazy(() => import('./pages/LeaguesPage'))
const SocialPage = lazy(() => import('./pages/SocialPage'))
const ShopPage = lazy(() => import('./pages/ShopPage'))
const ProPage = lazy(() => import('./pages/ProPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const QuizPage = lazy(() => import('./pages/QuizPage'))

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<TrailPage />} />
        <Route path="erros" element={<PracticePage />} />
        <Route path="ligas" element={<LeaguesPage />} />
        <Route path="comunidade" element={<SocialPage />} />
        <Route path="loja" element={<ShopPage />} />
        <Route path="pro" element={<ProPage />} />
        <Route path="perfil" element={<ProfilePage />} />
        <Route path="quiz" element={<QuizPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
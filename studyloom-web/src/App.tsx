import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import TrailPage from './pages/TrailPage'
import PracticePage from './pages/PracticePage'
import LeaguesPage from './pages/LeaguesPage'
import SocialPage from './pages/SocialPage'
import ShopPage from './pages/ShopPage'
import ProPage from './pages/ProPage'
import ProfilePage from './pages/ProfilePage'
import QuizPage from './pages/QuizPage'

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
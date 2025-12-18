import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import ChatBotPage from './pages/ChatBotPage/ChatBotPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import EducationPage from './pages/EducationPage/EducationPage'
import SidebarWrapper from './components/sidebar/sidebar-wrapper'
import MatchesPage from './pages/MatchesPage/MatchesPage'
import VerifyPage from './pages/VerifyPage/VerifyPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
// import Dashboard from './pages/Dashboard'

function App() {
  return (
    <main className="relative w-screen min-h-screen overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bot" element={<ChatBotPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/match" element={<MatchesPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/profileAdd" element={<ProfilePage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </main>
  )
}

export default App

import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import EducationPage from './pages/EducationPage/EducationPage'
import MatchesPage from './pages/MatchesPage/MatchesPage'
import VerifyPage from './pages/VerifyPage/VerifyPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import PrivateRoute from './PrivateRoute'


function App() {
  return (
    <main className="relative w-screen min-h-screen overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/education" element={<EducationPage />} />

        {/* Routes protégées */}
        <Route
          path="/match"
          element={
            <PrivateRoute>
              <MatchesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/verify"
          element={
            <PrivateRoute>
              <VerifyPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profileAdd"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </main>
  )
}

export default App

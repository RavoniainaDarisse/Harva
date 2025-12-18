import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ScheduleButton from './ScheduleButton/ScheduleButton'

function Navbar() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Vérifie si un token existe
  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    navigate('/')
  }

  return (
    <header className="flex items-center justify-between px-2 border-b md:px-16">
      {/* Logo */}
      <div className="flex items-center gap-2 font-sans text-sm font-semibold">
        <span className="text-xl font-bold">FP</span>
        <span className="tracking-wide">FIVE PATHWAYS FINANCIAL</span>
      </div>

      {/* Desktop Nav */}
      <nav className="items-center hidden gap-8 text-sm md:flex">
        <a href="#">My Guide</a>
        <a href="#">Enlighten</a>
        <a href="#">Services</a>
        <a href="#">Products</a>
        <a href="#">Education</a>
        <a href="#">Virtual Office</a>
        <a href="#">About</a>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3"
          >
            <ScheduleButton text="Se déconnecter" />
          </button>
        ) : (
          <button className="flex items-center gap-2 px-6 py-3">
            <ScheduleButton text="Se connectez" to="login" />
          </button>
        )}
      </nav>

      {/* Mobile Menu */}
      <button className="px-4 py-2 border rounded md:hidden">
        MENU
      </button>
    </header>
  )
}

export default Navbar

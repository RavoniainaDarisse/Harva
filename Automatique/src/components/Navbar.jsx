import React from 'react'
import ScheduleButton from './ScheduleButton/ScheduleButton'


function Navbar() {
  return (
    <div>
       <header className="flex items-center justify-between px-2 border bottom-14 md:px-16">
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
      
                <button className="flex items-center gap-2 px-6 py-3 ">
                <ScheduleButton text='Se connectez' to='login' />
                </button>
              </nav>
      
              {/* Mobile Menu */}
              <button className="px-4 py-2 border rounded md:hidden">
                MENU
              </button>
            </header>
    </div>
  )
}

export default Navbar
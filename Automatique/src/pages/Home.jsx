import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Navbar from '../components/Navbar'
import Features from '../components/Features'
import Futur from '../components/Futur'
import Story from '../components/Story'
// import Login from './components/Login'

function Home() {
  return (
    <main className="relative w-screen min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Futur />
      <Features />
      <Story />

      {/* <Login /> */}
    </main>
  )
}

export default Home
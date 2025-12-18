import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Navbar from '../components/Navbar'
import Features from '../components/Features'
import Futur from '../components/Futur'
import Story from '../components/Story'
import JourneysSlider from '../components/JourneysSlider/JourneysSlider'
import DirectionsSection from '../components/DirectionsSection/DirectionsSection'
import ServicesSection from '../components/ServicesSection/ServicesSection'
import SectionHomePrima from '../components/SectionHome1/SectionHomePrima'
import InsightsSection from '../components/InsightsSection/InsightsSection'
// import Login from './components/Login'

function Home() {
  return (
    <main className="relative w-screen min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <DirectionsSection />
      <JourneysSlider />
      <ServicesSection />
      <SectionHomePrima />
      <InsightsSection />

      {/* <Login /> */}
    </main>
  )
}

export default Home
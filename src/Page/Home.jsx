import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import KeyFeatures from '../components/KeyFeatures'
import HowITWorks from '../components/HowITWorks'
import SystemBenefits from '../components/SystemBenefits'
import Impact from '../components/Impact'
import AboutNSTU from '../components/AboutNSTU'
import GetInTouch from '../components/GetInTouch'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar ></Navbar>
      <Hero></Hero>
      <KeyFeatures></KeyFeatures>
      <HowITWorks></HowITWorks>
      <SystemBenefits></SystemBenefits>
      <Impact></Impact>
      <AboutNSTU></AboutNSTU>
      <GetInTouch></GetInTouch>
      <Footer></Footer>
     
    </div>
  )
}

export default Home
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Coverage from './components/Coverage.jsx'
import Sectors from './components/Sectors.jsx'
import PhotoStrip from './components/PhotoStrip.jsx'
import WhyUs from './components/WhyUs.jsx'
import Process from './components/Process.jsx'
import TickerStrip from './components/TickerStrip.jsx'
import IpmApproach from './components/IpmApproach.jsx'
import ClientPortal from './components/ClientPortal.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import FloatingCall from './components/FloatingCall.jsx'
import BackToTop from './components/BackToTop.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import PageLoader from './components/PageLoader.jsx'
import CursorGlow from './components/CursorGlow.jsx'

function App() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Coverage />
        <Sectors />
        <PhotoStrip />
        <TickerStrip
          items={['Индустриални обекти', 'Административни сгради', 'ХВП и аграрни обекти', 'Логистика и складове', 'Здравни структури', 'Хотели и ресторанти', 'Търговски обекти, пазари и молове']}
        />
        <WhyUs />
        <Process />
        <IpmApproach />
        <ClientPortal />
        <Contact />
      </main>
      <Footer />
      <FloatingCall />
      <BackToTop />
      <CursorGlow />
    </>
  )
}

export default App

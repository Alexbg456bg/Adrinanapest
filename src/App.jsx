import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Coverage from './components/Coverage.jsx'
import Sectors from './components/Sectors.jsx'
import Services from './components/Services.jsx'
import WhyUs from './components/WhyUs.jsx'
import Process from './components/Process.jsx'
import TickerStrip from './components/TickerStrip.jsx'
import Spotlight from './components/Spotlight.jsx'
import Partners from './components/Partners.jsx'
import Faq from './components/Faq.jsx'
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
        <Services />
        <WhyUs />
        <TickerStrip
          items={['Оглед', 'Оценка', 'План', 'Контрол', 'Проследяване']}
        />
        <Process />
        <Spotlight />
        <Partners />
        <Faq />
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

import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Services from './components/Services.jsx'
import Pests from './components/Pests.jsx'
import WhyUs from './components/WhyUs.jsx'
import Process from './components/Process.jsx'
import Spotlight from './components/Spotlight.jsx'
import Partners from './components/Partners.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import FloatingCall from './components/FloatingCall.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import PageLoader from './components/PageLoader.jsx'
import CustomCursor from './components/CustomCursor.jsx'

function App() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Pests />
        <WhyUs />
        <Process />
        <Spotlight />
        <Partners />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingCall />
    </>
  )
}

export default App

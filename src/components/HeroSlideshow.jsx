import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import corridorSprayPhoto from '../assets/team/corridor-spray-vertical.jpg'
import vanWarehouseSprayPhoto from '../assets/team/van-warehouse-spray.jpg'
import basementDuoSprayPhoto from '../assets/team/basement-duo-spray.jpg'
import mechanicalRoomSprayPhoto from '../assets/team/mechanical-room-spray.jpg'
import warehouseAisleWalkPhoto from '../assets/team/warehouse-aisle-walk.jpg'
import './HeroSlideshow.css'

// Само за телефон (виж media query в HeroSlideshow.css) — реални снимки от
// обекти се редуват на цял екран зад текста на Hero, вместо статичен тъмен
// панел. Instagram-style лентите отгоре показват, че снимките се сменят, и
// дават усещане за "на живо" вместо статична илюстрация.
const SLIDES = [
  corridorSprayPhoto,
  vanWarehouseSprayPhoto,
  basementDuoSprayPhoto,
  mechanicalRoomSprayPhoto,
  warehouseAisleWalkPhoto,
]
const SLIDE_DURATION = 4500

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="hero-slideshow" aria-hidden="true">
      {/* Всичките снимки остават монтирани постоянно и само им се сменя
          opacity — вместо AnimatePresence да ги маунтва/демаунтва при всяка
          смяна. При demount+exit понякога framer-motion не пуска старата
          снимка (остава "заклещена" на 0% opacity, но не се маха от DOM-а),
          а без demount изобщо този клас бъгове отпада. */}
      {SLIDES.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          alt=""
          className="hero-slideshow__img"
          animate={{ opacity: i === index ? 1 : 0, scale: i === index ? 1.08 : 1 }}
          transition={{
            opacity: { duration: 0.9, ease: 'easeInOut' },
            scale: { duration: SLIDE_DURATION / 1000 + 0.9, ease: 'linear' },
          }}
        />
      ))}
      <div className="hero-slideshow__scrim" />
      <div className="hero-slideshow__progress">
        {SLIDES.map((_, i) => (
          <span key={i} className="hero-slideshow__progress-track">
            {i === index && (
              <motion.span
                key={index}
                className="hero-slideshow__progress-fill"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

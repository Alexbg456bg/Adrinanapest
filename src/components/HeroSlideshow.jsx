import { useEffect, useState } from 'react'
import corridorSprayPhoto from '../assets/team/corridor-spray-vertical.jpg'
import vanWarehouseSprayPhoto from '../assets/team/van-warehouse-spray.jpg'
import basementDuoSprayPhoto from '../assets/team/basement-duo-spray.jpg'
import mechanicalRoomSprayPhoto from '../assets/team/mechanical-room-spray.jpg'
import warehouseAisleWalkPhoto from '../assets/team/warehouse-aisle-walk.jpg'
import officeFogPhoto from '../assets/team/office-fog.jpg'
import warehouseSprayPhoto from '../assets/team/warehouse-spray.jpg'
import vanInspectionPhoto from '../assets/team/van-inspection.jpg'
import warehouseFlashlightPhoto from '../assets/team/warehouse-flashlight.jpg'
import './HeroSlideshow.css'

// Реални снимки от обекти се редуват на цял екран зад текста на Hero.
// Портретни кадри за телефон, пейзажни за таблет/десктоп — иначе object-fit
// реже прекалено много от всяка снимка.
const PORTRAIT_SLIDES = [
  corridorSprayPhoto,
  vanWarehouseSprayPhoto,
  basementDuoSprayPhoto,
  mechanicalRoomSprayPhoto,
  warehouseAisleWalkPhoto,
]
const LANDSCAPE_SLIDES = [warehouseSprayPhoto, officeFogPhoto, vanInspectionPhoto, warehouseFlashlightPhoto]
const SLIDE_DURATION = 5000
const PORTRAIT_QUERY = '(max-width: 560px)'

function useSlides() {
  const [portrait, setPortrait] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(PORTRAIT_QUERY).matches
  )
  useEffect(() => {
    const mq = window.matchMedia(PORTRAIT_QUERY)
    const onChange = (e) => setPortrait(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return portrait ? PORTRAIT_SLIDES : LANDSCAPE_SLIDES
}

// Само opacity и transform, и то през CSS (виж HeroSlideshow.css) — минават
// директно през GPU compositor-а, без JS при всеки кадър (преди framer-motion
// пресмяташе scale/opacity на цели екранни снимки през requestAnimationFrame).
export default function HeroSlideshow() {
  const slides = useSlides()
  const [index, setIndex] = useState(0)
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState(() => new Set([0, 1]))

  useEffect(() => {
    setIndex(0)
    setLoaded(new Set([0, 1]))
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [slides])

  // Следващата снимка се зарежда чак когато предишната стане активна — така
  // при първо зареждане се теглят само първите две, а не всички наведнъж.
  useEffect(() => {
    setLoaded((prev) => new Set(prev).add(index).add((index + 1) % slides.length))
  }, [index, slides.length])

  // Първият кадър се показва веднага (без fade), а Ken Burns увеличението
  // тръгва от следващия кадър — иначе transition нямаше от какво да тръгне.
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="hero-slideshow" aria-hidden="true">
      {slides.map((src, i) =>
        loaded.has(i) ? (
          <img
            key={src}
            src={src}
            alt=""
            decoding="async"
            fetchPriority={i === 0 ? 'high' : 'low'}
            className={`hero-slideshow__img${i === index && ready ? ' is-active' : ''}${
              i === 0 && !ready ? ' is-initial' : ''
            }`}
          />
        ) : null
      )}
      <div className="hero-slideshow__scrim" />
      <div className="hero-slideshow__progress">
        {slides.map((_, i) => (
          <span key={i} className="hero-slideshow__progress-track">
            {i === index && <span key={index} className="hero-slideshow__progress-fill" />}
          </span>
        ))}
      </div>
    </div>
  )
}

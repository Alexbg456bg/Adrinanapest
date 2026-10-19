import { useEffect, useState } from 'react'
import curtainEntrancePhoto from '../assets/photos/curtain-entrance.webp'
import cleanroomFoggerPhoto from '../assets/photos/cleanroom-fogger.webp'
import fencePerimeterPhoto from '../assets/photos/fence-perimeter-fogging.webp'
import baitStationPhoto from '../assets/photos/bait-station-outdoor.webp'
import mallTreatmentPhoto from '../assets/photos/mall-treatment-team.webp'
import kitchenInspectionPhoto from '../assets/photos/kitchen-monitoring-inspection.webp'
import warehouseFoggingPhoto from '../assets/photos/warehouse-fogging-duo.webp'
import chemicalStoragePhoto from '../assets/photos/chemical-storage-walk.webp'
import fieldTickSamplingPhoto from '../assets/photos/field-tick-sampling.webp'
import './HeroSlideshow.css'

// Реални снимки от обекти се редуват на цял екран зад текста на Hero.
// Портретни кадри за телефон, пейзажни за таблет/десктоп — иначе object-fit
// реже прекалено много от всяка снимка.
const PORTRAIT_SLIDES = [
  curtainEntrancePhoto,
  cleanroomFoggerPhoto,
  fencePerimeterPhoto,
  baitStationPhoto,
  mallTreatmentPhoto,
]
const LANDSCAPE_SLIDES = [kitchenInspectionPhoto, warehouseFoggingPhoto, chemicalStoragePhoto, fieldTickSamplingPhoto]
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
  // Предишният кадър остава напълно видим ОТДОЛУ, докато новият се появява
  // отгоре — иначе двата се топят едновременно, сумарно са ~50% прозрачни и
  // тъмният фон "премигва" при всяка смяна.
  const [prev, setPrev] = useState(-1)
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState(() => new Set([0, 1]))

  useEffect(() => {
    setIndex(0)
    setPrev(-1)
    setLoaded(new Set([0, 1]))
    let current = 0
    const timer = setInterval(() => {
      setPrev(current)
      current = (current + 1) % slides.length
      setIndex(current)
    }, SLIDE_DURATION)
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
            fetchpriority={i === 0 ? 'high' : 'low'}
            className={`hero-slideshow__img${i === index && ready ? ' is-active' : ''}${
              i === prev && i !== index ? ' is-prev' : ''
            }${i === 0 && !ready ? ' is-initial' : ''}`}
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

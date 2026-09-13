import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { IconCheck, IconPhone, IconShield } from './icons.jsx'
import PestBackdrop from './PestBackdrop.jsx'
import Magnetic from './Magnetic.jsx'
import hlebarkaPhoto from '../assets/pests/hlebarka.jpg'
import mravkaPhoto from '../assets/pests/mravka.jpg'
import osaPhoto from '../assets/pests/osa.jpg'
import balhaPhoto from '../assets/pests/balha.jpg'
import karlezhPhoto from '../assets/pests/karlezh.jpg'
import gryzachPhoto from '../assets/pests/gryzach.jpg'
import wallTreatmentPhoto from '../assets/team/wall-treatment.jpg'
import './Hero.css'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

// Реални снимки на вредителите, с които работи фирмата — обикалят в орбита
// около баджа "23 години опит".
const ORBIT_ITEMS = [
  { photo: hlebarkaPhoto, label: 'Хлебарки' },
  { photo: mravkaPhoto, label: 'Мравки' },
  { photo: osaPhoto, label: 'Оси' },
  { photo: balhaPhoto, label: 'Бълхи' },
  { photo: gryzachPhoto, label: 'Гризачи' },
  { photo: karlezhPhoto, label: 'Кърлежи' },
]
const ORBIT_RADIUS_DESKTOP = 132
const ORBIT_RADIUS_MOBILE = 66
const ORBIT_DURATION = 34

function orbitPosition(index, total, radius) {
  const angle = (360 / total) * index - 90
  const rad = (angle * Math.PI) / 180
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius }
}

// На тесни екрани орбитата трябва да е по-малка, иначе снимките периодично
// застъпват "Дезинсекция / Дератизация..." плочките под баджа при въртене.
function useOrbitRadius() {
  const [radius, setRadius] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth <= 900 ? ORBIT_RADIUS_MOBILE : ORBIT_RADIUS_DESKTOP
  )

  useEffect(() => {
    const update = () => setRadius(window.innerWidth <= 900 ? ORBIT_RADIUS_MOBILE : ORBIT_RADIUS_DESKTOP)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return radius
}

export default function Hero() {
  const pinRef = useRef(null)
  const orbitRadius = useOrbitRadius()
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end start'],
  })

  // "Стек карти" преход — Hero остава рязък (без blur), само леко се смалява,
  // заоблява и притъмнява, докато следващата секция (Stats) буквално се
  // изтегля отгоре му като карта (виж Stats.css — голям отрицателен margin-top).
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const radius = useTransform(scrollYProgress, [0, 1], [0, 48])
  const y = useTransform(scrollYProgress, [0, 1], [0, -30])
  const dim = useTransform(scrollYProgress, [0, 0.8], [0, 0.6])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const backdropParallax = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <div className="hero-pin" ref={pinRef}>
      <motion.section
        id="top"
        className="hero has-cursor-accent"
        style={{ scale, borderRadius: radius, y }}
      >
        <motion.div className="hero__scrim" aria-hidden="true" style={{ opacity: dim }} />
        <div className="hero__split">
          <div className="hero__text">
            <motion.div
              className="hero__content"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.span variants={item} className="eyebrow eyebrow--light">
                <span className="hero__eyebrow-full">Управление на вредители за бизнеса — от 2003 г.</span>
                <span className="hero__eyebrow-short">ДДД за бизнеса — от 2003 г.</span>
              </motion.span>

              <motion.h1 variants={item}>
                ДДД контрол, вграден в работния процес —{' '}
                <span className="hero__accent">не в извънредната ситуация</span>
              </motion.h1>

              <motion.p variants={item} className="hero__lead hero__lead--full">
                Адрина ООД управлява ДДД риска в производствени, логистични и административни
                обекти. Дезинсекция, дератизация, дезинфекция и дезакаризация се извършват по
                договорен график, с протокол и фактура след всяко третиране.
              </motion.p>
              <motion.p variants={item} className="hero__lead hero__lead--short">
                Дезинсекция, дератизация, дезинфекция и дезакаризация за бизнеса — с протокол
                след всяко третиране.
              </motion.p>

              <motion.div variants={item} className="hero__actions">
                <Magnetic>
                  <a href="#kontakti" className="btn btn-primary hero__cta-form">Направете запитване</a>
                </Magnetic>
                <a href="tel:+359887803023" className="btn btn-outline hero__phone-cta">
                  <span className="hero__phone-pulse" aria-hidden="true" />
                  <IconPhone width={18} height={18} />
                  0887 803 023
                </a>
              </motion.div>

              <motion.ul variants={item} className="hero__checks">
                <li><IconCheck width={16} height={16} /> 23 години опит с бизнес клиенти</li>
                <li><IconCheck width={16} height={16} /> Протокол и фактура след всяко третиране</li>
                <li><IconCheck width={16} height={16} /> Без прекъсване на процеса</li>
              </motion.ul>
            </motion.div>
          </div>

          <div className="hero__visual">
            <PestBackdrop
              photo={wallTreatmentPhoto}
              className="hero__visual-backdrop"
              parallaxY={backdropParallax}
            />
            <div className="hero__visual-bg" aria-hidden="true">
              <motion.span
                className="hero__blob hero__blob--1"
                animate={{ y: [0, -24, 0], x: [0, 16, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.span
                className="hero__blob hero__blob--2"
                animate={{ y: [0, 20, 0], x: [0, -18, 0] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="hero__grid" />
            </div>

            <motion.div
              className="hero__badge"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            >
              <motion.div
                className="hero__badge-ring"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="hero__badge-core"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <IconShield width={44} height={44} />
                <strong>23</strong>
                <span>години опит</span>
              </motion.div>

              <motion.div
                className="hero__orbit"
                animate={{ rotate: 360 }}
                transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: 'linear' }}
              >
                {ORBIT_ITEMS.map(({ photo, label }, i) => {
                  const { x: ox, y: oy } = orbitPosition(i, ORBIT_ITEMS.length, orbitRadius)
                  return (
                    <div
                      key={label}
                      className="hero__orbit-slot"
                      style={{ transform: `translate(-50%, -50%) translate(${ox}px, ${oy}px)` }}
                    >
                      <motion.div
                        className="hero__chip hero__chip--photo"
                        animate={{ rotate: -360 }}
                        transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: 'linear' }}
                      >
                        <img src={photo} alt={label} loading="lazy" />
                      </motion.div>
                    </div>
                  )
                })}
              </motion.div>
            </motion.div>

            <div className="hero__visual-caption">
              <span>Дезинсекция</span>
              <span>Дератизация</span>
              <span>Дезинфекция</span>
              <span>Дезакаризация</span>
            </div>
          </div>
        </div>

        <motion.div className="hero__scroll-cue" style={{ opacity: cueOpacity }}>
          <span />
          <small>Скролнете</small>
        </motion.div>
      </motion.section>
    </div>
  )
}

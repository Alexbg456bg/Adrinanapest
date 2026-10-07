import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { IconCheck, IconArrowRight } from './icons.jsx'
import Magnetic from './Magnetic.jsx'
import HeroSlideshow from './HeroSlideshow.jsx'
import { handleHashClick } from '../utils/scroll.js'
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

const SERVICE_LINKS = ['Дезинфекция', 'Дезинсекция', 'Дератизация', 'Дезакаризация']

export default function Hero() {
  const pinRef = useRef(null)
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

  return (
    <div className="hero-pin" ref={pinRef}>
      <motion.section
        id="top"
        className="hero has-cursor-accent has-grain"
        style={{ scale, borderRadius: radius, y }}
      >
        <motion.div className="hero__scrim" aria-hidden="true" style={{ opacity: dim }} />
        <HeroSlideshow />
        <div className="hero__split">
          <div className="hero__text">
            <motion.div
              className="hero__content"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.h1 variants={item}>
                Контролирана среда.{' '}
                <span className="hero__accent">Документиран резултат.</span>
              </motion.h1>

              <motion.p variants={item} className="hero__lead">
                АДРИНА планира, изпълнява и документира ДДД програми за обществени структури и
                предприятия.
              </motion.p>

              <motion.div variants={item} className="hero__actions">
                <Magnetic>
                  <a href="#kontakti" className="btn btn-primary hero__cta-form" onClick={handleHashClick('#kontakti')}>Заявете консултация</a>
                </Magnetic>
                <Magnetic>
                  <a href="#sektori" className="btn btn-outline hero__phone-cta" onClick={handleHashClick('#sektori')}>
                    Решения за организации
                    <IconArrowRight width={16} height={16} />
                  </a>
                </Magnetic>
              </motion.div>

              <motion.ul variants={item} className="hero__checks">
                <li><IconCheck width={16} height={16} /> 23 години опит с бизнес клиенти</li>
                <li><IconCheck width={16} height={16} /> Протокол и фактура след всяко третиране</li>
                <li><IconCheck width={16} height={16} /> Без прекъсване на процеса</li>
              </motion.ul>
            </motion.div>
          </div>
        </div>

        <nav className="hero__services" aria-label="Услуги">
          {SERVICE_LINKS.map((label, i) => (
            <a
              key={label}
              href="#uslugi"
              className="hero__service"
              onClick={handleHashClick('#uslugi')}
            >
              <span className="hero__service-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="hero__service-label">{label}</span>
              <IconArrowRight width={16} height={16} />
            </a>
          ))}
        </nav>
      </motion.section>
    </div>
  )
}

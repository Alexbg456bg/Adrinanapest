import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import warehouseSprayPhoto from '../assets/team/warehouse-spray.jpg'
import RevealHeading from './RevealHeading.jsx'
import './Spotlight.css'

const FACTS = [
  { value: '23', label: 'години професионален опит' },
  { value: 'Протокол', label: 'и фактура след третиране' },
  { value: '4', label: 'ДДД услуги в едно портфолио' },
]

export default function Spotlight() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-40, 40])

  // "Изправяне напред" ефект — секцията влиза наклонена и смалена (сякаш
  // легнала назад в страницата) и се "изправя" към зрителя, докато се скролва
  // в изгледа: скалиране, наклон по X и заобляне на ъглите се разгъват до 0.
  const enter = useTransform(scrollYProgress, [0, 0.4], [0, 1], { clamp: true })
  const frameScale = useTransform(enter, [0, 1], [0.88, 1])
  const frameRotateX = useTransform(enter, [0, 1], [14, 0])
  const frameRadius = useTransform(enter, [0, 1], [44, 0])
  const frameOpacity = useTransform(enter, [0, 1], [0.35, 1])

  return (
    <section className="spotlight" ref={sectionRef}>
      <motion.div
        className="spotlight__frame has-cursor-accent"
        style={{
          scale: frameScale,
          rotateX: frameRotateX,
          borderRadius: frameRadius,
          opacity: frameOpacity,
          transformPerspective: 1000,
          transformOrigin: '50% 100%',
        }}
      >
        <motion.img
          src={warehouseSprayPhoto}
          alt="Екип на Адрина ООД третира производствен обект"
          className="spotlight__img"
          style={{ y: parallaxY }}
        />
        <div className="spotlight__overlay" />

        <div className="container spotlight__inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow eyebrow--light">На терен</span>
            <RevealHeading className="spotlight__title">
              Рискът не изчаква работния график —{' '}
              <span className="accent-text">ние също не.</span>
            </RevealHeading>
            <p className="spotlight__lead">
              Защитно оборудване и обучен екип за обекти с непрекъснат режим на работа —
              от логистичен център до производствен цех.
            </p>
          </motion.div>

          <motion.div
            className="spotlight__facts"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {FACTS.map((f) => (
              <div key={f.label} className="spotlight__fact">
                <strong>{f.value}</strong>
                <span>{f.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

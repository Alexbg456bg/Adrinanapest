import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import warehouseSprayPhoto from '../assets/team/warehouse-spray.jpg'
import './Spotlight.css'

const FACTS = [
  { value: '20+', label: 'години професионален опит' },
  { value: '№ 2-25', label: 'лиценз от 01.04.2005 г.' },
  { value: '4', label: 'ДДД услуги в едно портфолио' },
]

export default function Spotlight() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-40, 40])

  return (
    <section className="spotlight has-cursor-accent" ref={sectionRef}>
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
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow eyebrow--light">На терен</span>
          <h2 className="spotlight__title">
            Вредителите не чакат —{' '}
            <span className="accent-text">ние винаги идваме подготвени.</span>
          </h2>
          <p className="spotlight__lead">
            Защитно оборудване, сертифицирани препарати и обучен екип за обекти
            от жилищна сграда до производствен цех.
          </p>
        </motion.div>

        <motion.div
          className="spotlight__facts"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
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
    </section>
  )
}

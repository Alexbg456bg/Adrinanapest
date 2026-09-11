import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import './Stats.css'

const STATS = [
  { value: 20, suffix: '+', label: 'години опит (от 2005 г.)' },
  { value: 4, suffix: '', label: 'ДДД услуги' },
  { value: 24, suffix: ' ч.', label: 'реакция при спешност' },
  { value: 100, suffix: '%', label: 'лицензирани препарати' },
]

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className="stats__number">
      {display}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="stats has-cursor-accent">
      <div className="container stats__grid">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className="stats__item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Counter value={s.value} suffix={s.suffix} />
            <span className="stats__label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

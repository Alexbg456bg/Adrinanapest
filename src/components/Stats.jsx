import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import BrandMotif from './BrandMotif.jsx'
import './Stats.css'

// Само потвърдени факти — без предположения за клиентска база, обем
// обработени площи или сертификати.
const STATS = [
  { kind: 'number', value: 23, suffix: '', label: 'години опит (от 2003 г.)' },
  { kind: 'number', value: 4, suffix: '', label: 'ДДД услуги в едно портфолио' },
  { kind: 'number', value: 24, suffix: ' ч.', label: 'реакция при спешност' },
  { kind: 'text', big: 'IPM подход', label: 'превенция, наблюдение и контрол' },
]

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })
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
      <BrandMotif className="brand-motif--on-dark brand-motif--sm brand-motif--stats" />
      <BrandMotif className="brand-motif--on-dark brand-motif--sm brand-motif--stats-left" />
      <div className="container stats__grid">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className="stats__item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            {s.kind === 'number' ? (
              <Counter value={s.value} suffix={s.suffix} />
            ) : (
              <span className="stats__number">{s.big}</span>
            )}
            <span className="stats__label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

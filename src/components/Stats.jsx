import { motion } from 'framer-motion'
import BrandMotif from './BrandMotif.jsx'
import './Stats.css'

// Само потвърдени факти — без предположения за клиентска база, обем
// обработени площи или сертификати. Числата са статични (без брояч).
const STATS = [
  { big: '4', label: 'ДДД услуги в едно портфолио' },
  { big: '7', label: 'типа обекти — корпоративни, обществени и частни' },
  { big: 'IPM подход', label: 'оценка, превенция и контрол' },
]

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
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <span className="stats__number">{s.big}</span>
            <span className="stats__label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

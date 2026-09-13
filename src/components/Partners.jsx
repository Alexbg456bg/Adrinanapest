import { motion } from 'framer-motion'
import './Partners.css'

// Реални партньори/клиенти от досегашния сайт на "Адрина ООД".
const PARTNERS = ['ЙОД АД', 'Кинотеатър „Освобождение“ София']

export default function Partners() {
  return (
    <section className="partners">
      <div className="container partners__inner">
        <span className="partners__label">Доверяват ни се</span>
        <motion.div
          className="partners__list"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          {PARTNERS.map((p) => (
            <span key={p} className="partners__chip">{p}</span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

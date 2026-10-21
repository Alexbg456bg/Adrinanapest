import { motion } from 'framer-motion'
import RevealHeading from './RevealHeading.jsx'
import BrandMotif from './BrandMotif.jsx'
import './IpmApproach.css'

// Кръговият IPM цикъл от референтния сайт на клиентката — 5 етапа около
// център "IPM / непрекъснат контрол". Етапите са разположени по окръжност
// чрез CSS променливата --angle (виж IpmApproach.css).
const STEPS = [
  { n: '01', title: 'Оценка', note: 'рискове и активност' },
  { n: '02', title: 'Превенция', note: 'достъпи и условия' },
  { n: '03', title: 'Наблюдение', note: 'контролни точки' },
  { n: '04', title: 'Контрол', note: 'целенасочени мерки' },
  { n: '05', title: 'Оптимизация', note: 'оценка и корекции' },
]

export default function IpmApproach() {
  return (
    <section id="ipm" className="section section-alt ipm">
      <BrandMotif className="brand-motif--ipm" />
      <div className="container ipm__inner">
        <div className="ipm__copy">
          <span className="eyebrow">Екологичен IPM подход</span>
          <RevealHeading>Планирани обработки и <span className="accent-text">контрол на резултата</span></RevealHeading>
          <p>
            АДРИНА прилага интегрирано управление на вредителите, което съчетава професионални ДДД
            обработки, наблюдение и превантивни мерки. За всеки обект се определят подходящите
            разрешени биоциди, методите на приложение и честотата на третиране. Резултатът се
            проследява и програмата се коригира според установената активност.
          </p>
          <blockquote className="ipm__quote">
            По-малко излишно третиране.
            <strong>Повече превенция, наблюдение и контрол.</strong>
          </blockquote>
        </div>

        <div className="ipm__visual" aria-label="Кръгов подход към интегрираното управление на вредителите">
          <div className="ipm__ring" aria-hidden="true" />
          <motion.div
            className="ipm__core"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <strong>IPM</strong>
            <span>непрекъснат контрол</span>
          </motion.div>
          <ol className="ipm__cycle">
            {STEPS.map((s, i) => (
              // Позицията по окръжността е CSS transform на <li>, а анимацията —
              // на вътрешния елемент, иначе framer-motion презаписва transform-а.
              <li key={s.n} className="ipm__step" style={{ '--angle': `${-90 + i * 72}deg` }}>
                <motion.div
                  className="ipm__step-card"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
                >
                  <span className="ipm__step-num">{s.n}</span>
                  <span className="ipm__step-title">{s.title}</span>
                  <span className="ipm__step-note">{s.note}</span>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

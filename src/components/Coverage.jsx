import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { IconSpray, IconBug, IconRat, IconShield } from './icons.jsx'
import RevealHeading from './RevealHeading.jsx'
import './Coverage.css'

const CARDS = [
  { icon: IconSpray, title: 'Дезинфекция', value: 87000, note: 'ежемесечно' },
  { icon: IconBug, title: 'Дезинсекция', subtitle: '(и дезакаризация)', value: 12000, note: 'ежемесечно' },
  { icon: IconRat, title: 'Дератизация', value: 65000, note: 'ежемесечно' },
  { icon: IconShield, title: 'Общо ДДД мероприятия', value: 164000, note: 'всеки месец', dark: true },
]

function formatArea(n) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function CoverageValue({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className="coverage__value">
      над {formatArea(display)} m²
    </span>
  )
}

export default function Coverage() {
  return (
    <section className="section coverage">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Корпоративни решения</span>
          <RevealHeading>Контролът започва <span className="accent-text">преди появата на проблем</span></RevealHeading>
          <p>
            Оглеждаме обекта, определяме източниците на риск и изготвяме план с конкретни мерки,
            честота и контролни точки. Така защитаваме хората, животните, суровините и работния
            процес и ограничаваме риска от замърсяване, бракувана продукция и прекъсване на
            дейността.
          </p>
        </div>

        <div className="coverage__grid">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              className={`coverage__card ${c.dark ? 'coverage__card--dark' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <span className="coverage__icon">
                <c.icon width={24} height={24} />
              </span>
              <h3>
                {c.title}
                {c.subtitle && <small>{c.subtitle}</small>}
              </h3>
              <CoverageValue value={c.value} />
              <span className="coverage__note">{c.note}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

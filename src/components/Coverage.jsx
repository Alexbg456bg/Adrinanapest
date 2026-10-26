import { useEffect, useRef } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { IconShield } from './icons.jsx'
import { IconDisinfection, IconInsects, IconRodent } from './CoverageIcons.jsx'
import RevealHeading from './RevealHeading.jsx'
import BrandMotif from './BrandMotif.jsx'
import './Coverage.css'

const CARDS = [
  { icon: IconDisinfection, size: 34, title: 'Дезинфекция', value: 87000, note: 'ежемесечно' },
  { icon: IconInsects, size: 34, title: 'Дезинсекция и дезакаризация', value: 12000, note: 'ежемесечно' },
  { icon: IconRodent, size: 34, title: 'Дератизация', value: 65000, note: 'ежемесечно' },
  { icon: IconShield, size: 26, title: 'Обработени площи месечно', value: 164000, note: 'общо по услуги', dark: true, big: true },
]

// Неразкъсваем интервал за хилядите и пред m², за да не се пренася "87" / "000 m²".
function formatArea(n) {
  return `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}\u00A0m²`
}

function CoverageValue({ value, big }) {
  const ref = useRef(null)
  // Само вертикален марж: на телефон '-80px' изрязва и страничните ръбове, а
  // късият текст в лявата колона остава изцяло извън зоната и броячът не стартира.
  const inView = useInView(ref, { once: true, margin: '120px 0px' })

  // Пише директно в DOM-а вместо setState на всеки кадър.
  useEffect(() => {
    if (!inView) return undefined
    const controls = animate(0, value, {
      duration: 1,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = formatArea(v)
      },
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span className={`coverage__value ${big ? 'coverage__value--big' : ''}`}>
      <span className="coverage__prefix">над</span>
      <span ref={ref} className="coverage__num">
        {formatArea(0)}
      </span>
    </span>
  )
}

export default function Coverage() {
  return (
    <section className="section coverage">
      <BrandMotif className="brand-motif--coverage" />
      <BrandMotif className="brand-motif--coverage-left" />
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Корпоративни ДДД услуги</span>
          <RevealHeading>Контрол на вредителите, <span className="accent-text">съобразен с всеки обект</span></RevealHeading>
          <p>
            АДРИНА планира и извършва дезинфекция, дезинсекция, дезакаризация и дератизация според
            спецификата и работния режим на обекта и установения биологичен риск. ДДД
            мероприятията защитават здравето на хората и животните, суровините и продукцията и
            подпомагат безопасното протичане на работния процес.
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
                <c.icon width={c.size} height={c.size} />
              </span>
              <h3>
                {c.title}
              </h3>
              <CoverageValue value={c.value} big={c.big} />
              <span className="coverage__note">{c.note}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { IconSearch, IconClipboard, IconCertificate, IconRepeat, IconShield, IconArrowRight } from './icons.jsx'
import RevealHeading from './RevealHeading.jsx'
import TiltCard from './TiltCard.jsx'
import CarouselDots from './CarouselDots.jsx'
import BrandMotif from './BrandMotif.jsx'
import { useMobileCarousel } from './useMobileCarousel.js'
import './Process.css'

const STEPS = [
  {
    n: '01',
    icon: IconSearch,
    title: 'Оглед',
    desc: 'Проверяваме рисковите точки, условията и следите от активност.',
  },
  {
    n: '02',
    icon: IconClipboard,
    title: 'Оценка',
    desc: 'Определяме мерките, графика, отговорностите и местата за наблюдение.',
  },
  {
    n: '03',
    icon: IconCertificate,
    title: 'План',
    desc: 'Отразяваме извършената работа, приложените средства и указанията към клиента.',
  },
  {
    n: '04',
    icon: IconShield,
    title: 'Контрол',
    desc: 'Сравняваме резултатите и при нужда променяме плана.',
  },
  {
    n: '05',
    icon: IconRepeat,
    title: 'Проследяване',
    desc: 'Периодичен мониторинг на контролните точки и коригиране на плана при нужда.',
  },
]

export default function Process() {
  const { ref: carouselRef, active, scrollToIndex } = useMobileCarousel(STEPS.length)

  return (
    <section id="kak-rabotim" className="section process">
      <BrandMotif className="brand-motif--sm brand-motif--process" />
      <BrandMotif className="brand-motif--sm brand-motif--process-left" />
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Процес</span>
          <RevealHeading>Как <span className="accent-text">работим</span></RevealHeading>
          <p>Пет стъпки от <strong>огледа</strong> до документирания резултат.</p>
        </div>

        <div className="process__steps" ref={carouselRef}>
          {STEPS.map((s, i) => {
            const isRowEnd = (i + 1) % 5 === 0
            return (
              <TiltCard
                key={s.n}
                className="process__step"
                maxTilt={6}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-80px' }}
                transition={{ duration: 0.5, delay: (i % 5) * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div className="process__top">
                  <span className="process__icon">
                    <s.icon width={24} height={24} />
                  </span>
                  <span className="process__number">{s.n}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>

                {!isRowEnd && i < STEPS.length - 1 && (
                  <motion.span
                    className="process__arrow"
                    aria-hidden="true"
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: '-80px' }}
                    transition={{ duration: 0.4, delay: (i % 5) * 0.1 + 0.35 }}
                  >
                    <IconArrowRight width={18} height={18} />
                  </motion.span>
                )}
              </TiltCard>
            )
          })}
        </div>
        <CarouselDots count={STEPS.length} active={active} onSelect={scrollToIndex} />
      </div>
    </section>
  )
}

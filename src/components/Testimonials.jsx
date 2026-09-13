import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconStar, IconArrowLeft, IconArrowRight, IconQuote } from './icons.jsx'
import RevealHeading from './RevealHeading.jsx'
import './Testimonials.css'

// ПРИМЕРНИ отзиви — заменете с реални коментари на клиенти (с тяхно съгласие) преди пускане в реална експлоатация.
const REVIEWS = [
  {
    name: 'Клиент',
    role: 'Производствен обект',
    text: 'Третиранията се извършват по график, без да прекъсват производствения процес. Протоколът и фактурата пристигат редовно след всяко посещение.',
  },
  {
    name: 'Клиент',
    role: 'Логистичен център',
    text: 'Работим на абонамент повече от година — контролните точки се следят системно и сме готови за проверка по всяко време.',
  },
  {
    name: 'Клиент',
    role: 'Хранително-вкусово предприятие',
    text: 'Коректна документация и ясен план за третиране — точно каквото ни трябва за вътрешния одит.',
  },
]

const AUTO_ADVANCE_MS = 6000

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)

  const go = (next) => {
    setDirection(next > index || (index === REVIEWS.length - 1 && next === 0) ? 1 : -1)
    setIndex(next)
  }

  const goNext = () => go((index + 1) % REVIEWS.length)
  const goPrev = () => go((index - 1 + REVIEWS.length) % REVIEWS.length)

  useEffect(() => {
    if (paused) return undefined
    timerRef.current = setInterval(() => {
      setDirection(1)
      setIndex((i) => (i + 1) % REVIEWS.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(timerRef.current)
  }, [paused])

  const review = REVIEWS[index]

  return (
    <section id="otzivi" className="section section-alt testimonials">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Отзиви</span>
          <RevealHeading>Какво казват <span className="accent-text">клиентите ни</span></RevealHeading>
          {/* TODO: примерни отзиви — заменете с реални преди пускане в реална експлоатация */}
        </div>

        <div
          className="testimonials__carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <IconQuote className="testimonials__quote-mark" />

          <div className="testimonials__viewport">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                key={index}
                className="testimonials__slide"
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
              >
                <div className="testimonials__stars">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <IconStar key={idx} width={17} height={17} />
                  ))}
                </div>
                <p className="testimonials__text">&ldquo;{review.text}&rdquo;</p>
                <div className="testimonials__author">
                  <strong>{review.name}</strong>
                  <span>{review.role}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="testimonials__controls">
            <button type="button" className="testimonials__nav" onClick={goPrev} aria-label="Предишен отзив">
              <IconArrowLeft width={18} height={18} />
            </button>

            <div className="testimonials__dots">
              {REVIEWS.map((r, i) => (
                <button
                  key={r.role}
                  type="button"
                  className={`testimonials__dot ${i === index ? 'is-active' : ''}`}
                  onClick={() => go(i)}
                  aria-label={`Отзив ${i + 1}`}
                />
              ))}
            </div>

            <button type="button" className="testimonials__nav" onClick={goNext} aria-label="Следващ отзив">
              <IconArrowRight width={18} height={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

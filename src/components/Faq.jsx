import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconChevronDown } from './icons.jsx'
import RevealHeading from './RevealHeading.jsx'
import BrandMotif from './BrandMotif.jsx'
import './Faq.css'

// Само потвърдени факти — без измислени срокове, цени или сертификати.
const FAQS = [
  {
    q: 'Как се формира цената?',
    a: 'След безплатен оглед на обекта изготвяме индивидуална оферта — цената зависи от вида обект, площта и вида третиране.',
  },
  {
    q: 'Безопасно ли е за хора, деца, животни и хранителни продукти?',
    a: 'Прилагаме методи и продукти съобразно вида на обекта и нормативните изисквания. При хранителни и чувствителни зони третирането се съобразява с работния режим на обекта, за да се ограничи рискът.',
  },
  {
    q: 'Колко трае едно третиране?',
    a: 'Зависи от площта и вида на обекта. Уговаряме график предварително, така че да не пречи на работния процес.',
  },
  {
    q: 'Колко бързо реагирате при спешен случай?',
    a: 'При спешност реакцията е до 24 часа.',
  },
  {
    q: 'Издавате ли документ след третиране?',
    a: 'Да — протокол и фактура след всяко посещение, готови за вътрешна или регулаторна проверка.',
  },
  {
    q: 'Работите ли извън София?',
    a: 'Да, без регионално ограничение — обслужваме обекти в цялата страна по договорен график.',
  },
]

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq__item ${isOpen ? 'is-open' : ''}`}>
      <button type="button" className="faq__question" onClick={onToggle} aria-expanded={isOpen}>
        <span>{item.q}</span>
        <motion.span
          className="faq__chevron"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <IconChevronDown width={18} height={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq__answer-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="faq__answer">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="vaprosi" className="section faq">
      <BrandMotif className="brand-motif--faq" />
      <BrandMotif className="brand-motif--faq-left" />
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Въпроси</span>
          <RevealHeading>Най-често <span className="accent-text">питани въпроси</span></RevealHeading>
          <p>Кратки отговори — за повече подробности се свържете с нас.</p>
        </div>

        <div className="faq__list">
          {FAQS.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <FaqItem
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

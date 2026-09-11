import { motion } from 'framer-motion'
import { IconPhone, IconSearch, IconSpray, IconRepeat, IconArrowRight } from './icons.jsx'
import RevealHeading from './RevealHeading.jsx'
import TiltCard from './TiltCard.jsx'
import './Process.css'

const STEPS = [
  {
    n: '01',
    icon: IconPhone,
    title: 'Запитване',
    desc: 'Обаждате се, пишете ни или попълвате формата — уточняваме обекта, вредителя и удобно за вас време.',
  },
  {
    n: '02',
    icon: IconSearch,
    title: 'Оглед на обекта',
    desc: 'Специалист извършва инспекция на място и определя степента на зараза и подходящия метод на третиране.',
  },
  {
    n: '03',
    icon: IconSpray,
    title: 'Обработка',
    desc: 'Прилагаме сертифицирани биоцидни препарати (Bayer, BASF, Novartis и др.), съобразени с вида на обекта.',
  },
  {
    n: '04',
    icon: IconRepeat,
    title: 'Профилактика и гаранция',
    desc: 'Предлагаме еднократна обработка или абонаментен график с редовен мониторинг за трайна защита.',
  },
]

export default function Process() {
  return (
    <section id="kak-rabotim" className="section process">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Процес</span>
          <RevealHeading>Как <span className="accent-text">работим</span></RevealHeading>
          <p>Прозрачен процес от <strong>първия разговор</strong> до финалния резултат.</p>
        </div>

        <div className="process__steps">
          {STEPS.map((s, i) => (
            <TiltCard
              key={s.n}
              className="process__step"
              maxTilt={6}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
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

              {i < STEPS.length - 1 && (
                <motion.span
                  className="process__arrow"
                  aria-hidden="true"
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.35 }}
                >
                  <IconArrowRight width={18} height={18} />
                </motion.span>
              )}
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

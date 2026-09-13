import { motion } from 'framer-motion'
import { IconPhone, IconSearch, IconClipboard, IconUsers, IconSpray, IconCertificate, IconRepeat, IconShield, IconArrowRight } from './icons.jsx'
import RevealHeading from './RevealHeading.jsx'
import TiltCard from './TiltCard.jsx'
import './Process.css'

const STEPS = [
  {
    n: '01',
    icon: IconPhone,
    title: 'Запитване',
    desc: 'Приемаме запитването и уточняваме обекта, обхвата на дейност и критичните точки за проверка.',
  },
  {
    n: '02',
    icon: IconSearch,
    title: 'Оглед и оценка на риска',
    desc: 'Инспекция на място, идентифициране на огнища и оценка на риска за работния процес.',
  },
  {
    n: '03',
    icon: IconClipboard,
    title: 'План за третиране',
    desc: 'Изготвяме план по IPM подход — метод, честота и контролни точки, съобразени с обекта.',
  },
  {
    n: '04',
    icon: IconUsers,
    title: 'Съгласуване',
    desc: 'Съгласуваме график и достъп с отговорните лица, без прекъсване на работния процес.',
  },
  {
    n: '05',
    icon: IconSpray,
    title: 'Третиране',
    desc: 'Извършваме дезинсекция, дератизация, дезинфекция или дезакаризация според плана.',
  },
  {
    n: '06',
    icon: IconCertificate,
    title: 'Документиране',
    desc: 'Всяко третиране приключва с протокол и фактура — за вашата вътрешна документация.',
  },
  {
    n: '07',
    icon: IconRepeat,
    title: 'Проследяване',
    desc: 'Периодичен мониторинг на контролните точки и коригиране на плана при нужда.',
  },
  {
    n: '08',
    icon: IconShield,
    title: 'Отчетност',
    desc: 'Поддържаме пълна проследимост на обекта — готовност за вътрешна или регулаторна проверка.',
  },
]

export default function Process() {
  return (
    <section id="kak-rabotim" className="section process">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Процес</span>
          <RevealHeading>Как <span className="accent-text">работим</span></RevealHeading>
          <p>Осем стъпки от <strong>първия контакт</strong> до документирания резултат.</p>
        </div>

        <div className="process__steps">
          {STEPS.map((s, i) => {
            const isRowEnd = (i + 1) % 4 === 0
            return (
              <TiltCard
                key={s.n}
                className="process__step"
                maxTilt={6}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-80px' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
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
                    transition={{ duration: 0.4, delay: (i % 4) * 0.1 + 0.35 }}
                  >
                    <IconArrowRight width={18} height={18} />
                  </motion.span>
                )}
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}

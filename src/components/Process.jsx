import { motion } from 'framer-motion'
import './Process.css'

const STEPS = [
  { n: '01', title: 'Запитване', desc: 'Обаждате се, пишете ни или попълвате формата — уточняваме обекта, вредителя и удобно за вас време.' },
  { n: '02', title: 'Оглед на обекта', desc: 'Специалист извършва инспекция на място и определя степента на зараза и подходящия метод на третиране.' },
  { n: '03', title: 'Обработка', desc: 'Прилагаме сертифицирани биоцидни препарати (Bayer, BASF, Novartis и др.), съобразени с вида на обекта.' },
  { n: '04', title: 'Профилактика и гаранция', desc: 'Предлагаме еднократна обработка или абонаментен график с редовен мониторинг за трайна защита.' },
]

export default function Process() {
  return (
    <section id="kak-rabotim" className="section process">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Процес</span>
          <h2>Как <span className="accent-text">работим</span></h2>
          <p>Прозрачен процес от <strong>първия разговор</strong> до финалния резултат.</p>
        </div>

        <div className="process__steps">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              className="process__step"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="process__number">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < STEPS.length - 1 && (
                <motion.span
                  className="process__connector"
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.35, ease: 'easeOut' }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

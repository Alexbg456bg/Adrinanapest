import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { IconCertificate, IconUsers, IconLeaf, IconBuilding, IconRepeat } from './icons.jsx'
import corridorCheckPhoto from '../assets/team/corridor-check.jpg'
import './WhyUs.css'

const POINTS = [
  {
    icon: IconCertificate,
    title: 'Лицензирани от 2005 г.',
    desc: 'Удостоверение № 2-25/01.04.2005 г. Работим по Наредба № 1 от 5 януари 2018 г. на Министерство на здравеопазването.',
  },
  {
    icon: IconUsers,
    title: 'Семейна фирма с грижа',
    desc: 'Обслужваме клиенти в София вече над 20 години — лично отношение, коректност и доверие.',
  },
  {
    icon: IconLeaf,
    title: 'Сертифицирани препарати',
    desc: 'Използваме биоцидни продукти с разрешение от Министерство на здравеопазването на марки като Bayer, BASF и Novartis.',
  },
  {
    icon: IconBuilding,
    title: 'За дома и бизнеса',
    desc: 'Жилища, офиси, ресторанти, хотели, училища, детски градини, складове и производствени обекти.',
  },
  {
    icon: IconRepeat,
    title: 'Еднократни и абонаментни планове',
    desc: 'От еднократна обработка до редовен абонамент по график, съгласуван с вас.',
  },
]

export default function WhyUs() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section id="zashto-nie" className="section why has-cursor-accent" ref={sectionRef}>
      <div className="why__fade-bottom" aria-hidden="true" />
      <div className="container why__inner">
        <motion.div
          className="why__media"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="why__photo">
            <motion.img
              src={corridorCheckPhoto}
              alt="Специалист на Адрина ООД проверява станция за мониторинг на обект"
              loading="lazy"
              style={{ y: parallaxY }}
            />
            <div className="why__photo-badge">
              <strong>20+</strong>
              <span>години опит</span>
            </div>
          </div>
        </motion.div>

        <div className="why__content">
          <span className="eyebrow">Защо да изберете нас</span>
          <h2>Резултат, на който <span className="accent-text">можете да разчитате</span></h2>

          <div className="why__list">
            {POINTS.map((p, i) => (
              <motion.div
                key={p.title}
                className="why__point"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <div className="why__point-icon">
                  <p.icon width={20} height={20} />
                </div>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

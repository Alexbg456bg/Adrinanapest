import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { IconClock, IconPin, IconLeaf, IconBuilding, IconCertificate } from './icons.jsx'
import corridorCheckPhoto from '../assets/photos/cleanroom-fogger.webp'
import BlurReveal from './BlurReveal.jsx'
import BrandMotif from './BrandMotif.jsx'
import './WhyUs.css'

const POINTS = [
  {
    icon: IconClock,
    title: 'Опит от 2003 г.',
    desc: 'Практика в обекти с висока натовареност и постоянен режим на работа.',
  },
  {
    icon: IconPin,
    title: 'София и областта',
    desc: 'Обекти в други региони — по предварителна уговорка. Работата следва договорен график, съобразен с производствения режим.',
  },
  {
    icon: IconLeaf,
    title: 'IPM подход',
    desc: 'Комбинация от наблюдение, превенция и целево третиране — вместо еднократна намеса без проследяване.',
  },
  {
    icon: IconBuilding,
    title: 'За индустрия и институции',
    desc: 'Производствени линии, логистични центрове, хранително-вкусова промишленост, хотели и административни сгради.',
  },
  {
    icon: IconCertificate,
    title: 'Придружаваща документация след всяко третиране',
    desc: 'При всяко посещение — проследимост и готовност за вътрешна или външна проверка.',
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
      <BrandMotif className="brand-motif--on-dark brand-motif--why" />
      <BrandMotif className="brand-motif--on-dark brand-motif--why-left" />
      <div className="why__fade-bottom" aria-hidden="true" />
      <div className="container why__inner">
        <motion.div
          className="why__media"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="why__years">
            <strong>23+</strong>
            <span>години професионална практика</span>
          </div>
          <div className="why__photo">
            <motion.img
              src={corridorCheckPhoto}
              alt="Специалист на АДРИНА обработва помещение с ULV генератор"
              loading="lazy"
              style={{ y: parallaxY }}
            />
          </div>
        </motion.div>

        <div className="why__content">
          <span className="eyebrow">АДРИНА</span>
          <BlurReveal>Резултат, <span className="accent-text">който издържа на проверка</span></BlurReveal>

          <div className="why__list">
            {POINTS.map((p, i) => (
              <motion.div
                key={p.title}
                className="why__point"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-60px' }}
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

          <div className="why__about">
            <p className="why__about-lead">
              АДРИНА ООД е създадена в София през 2003 г. Дружеството, ЕИК 131046886, извършва
              дейността съгласно разрешение №60-00-16/22.04.2020 г. и работи под ръководството на
              регистрирани ръководители ДДД.
            </p>
            <div className="why__team">
              <div className="why__team-member">
                <strong>Елени Кацарова</strong>
                <span>биолог, ръководител ДДД</span>
                <span>удостоверение №2-25/01.04.2005 г.</span>
              </div>
              <div className="why__team-member">
                <strong>Адриана Кацарова</strong>
                <span>еколог, ръководител ДДД</span>
                <span>удостоверение №2-77/12.06.2026 г.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

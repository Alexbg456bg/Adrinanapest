import { motion } from 'framer-motion'
import { IconMosquito, IconMoth } from './icons.jsx'
import hlebarkaPhoto from '../assets/pests/hlebarka.png'
import mravkaPhoto from '../assets/pests/mravka.png'
import osaPhoto from '../assets/pests/osa.png'
import balhaPhoto from '../assets/pests/balha.png'
import darvenicaPhoto from '../assets/pests/darvenica.png'
import karlezhPhoto from '../assets/pests/karlezh.png'
import gryzachPhoto from '../assets/pests/gryzach.png'
import './Pests.css'

// Реални снимки за повечето вредители; за комари и молци (без наличен кадър)
// остава оригиналната SVG икона като резервен вариант.
const PESTS = [
  { photo: hlebarkaPhoto, label: 'Хлебарки' },
  { photo: mravkaPhoto, label: 'Мравки' },
  { icon: IconMosquito, label: 'Комари' },
  { photo: osaPhoto, label: 'Оси' },
  { photo: balhaPhoto, label: 'Бълхи' },
  { photo: darvenicaPhoto, label: 'Дървеници' },
  { icon: IconMoth, label: 'Молци' },
  { photo: gryzachPhoto, label: 'Гризачи' },
  { photo: karlezhPhoto, label: 'Кърлежи' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 18, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function Pests() {
  return (
    <section id="vreditelite" className="section pests">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Обхват</span>
          <h2>Вредители, с които <span className="accent-text">се справяме</span></h2>
          <p>Регулярната обработка и правилният метод дават <strong>траен резултат</strong> — независимо от вида на вредителя.</p>
        </div>

        <motion.div
          className="pests__grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {PESTS.map((p) => (
            <motion.div key={p.label} className="pests__item" variants={item} whileHover={{ y: -6 }}>
              <span className={`pests__icon${p.photo ? ' pests__icon--photo' : ''}`}>
                {p.photo ? (
                  <img src={p.photo} alt={p.label} loading="lazy" />
                ) : (
                  <p.icon width={26} height={26} />
                )}
              </span>
              <span className="pests__label">{p.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

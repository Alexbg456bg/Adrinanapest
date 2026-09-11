import { useState } from 'react'
import { motion } from 'framer-motion'
import hlebarkaPhoto from '../assets/pests/hlebarka.jpg'
import mravkaPhoto from '../assets/pests/mravka.jpg'
import osaPhoto from '../assets/pests/osa.jpg'
import balhaPhoto from '../assets/pests/balha.jpg'
import darvenicaPhoto from '../assets/pests/darvenica.jpg'
import karlezhPhoto from '../assets/pests/karlezh.jpg'
import gryzachPhoto from '../assets/pests/gryzach.jpg'
import PestModal from './PestModal.jsx'
import RevealHeading from './RevealHeading.jsx'
import './Pests.css'

const PESTS = [
  {
    photo: hlebarkaPhoto,
    label: 'Хлебарки',
    info: 'Нощни и изключително плодовити — една двойка може да доведе до стотици нови хлебарки за няколко месеца. Пренасят салмонела, E. coli и провокират алергии и астма у деца.',
  },
  {
    photo: mravkaPhoto,
    label: 'Мравки',
    info: 'Образуват колонии с хиляди индивиди и гнездят в стени, под подови настилки или зад кухненски уреди. Обикновен спрей разпръсква колонията, вместо да я унищожи.',
  },
  {
    photo: osaPhoto,
    label: 'Оси',
    info: 'Едно гнездо може да прерасне от няколко до над 5000 индивида за един сезон. Ужилването е болезнено, а при алергия — животозастрашаващо, затова премахването изисква професионална екипировка.',
  },
  {
    photo: balhaPhoto,
    label: 'Бълхи',
    info: 'Ларвите оцеляват с месеци в килими, мека мебел и пукнатини по пода. Третирането само на домашния любимец не е достатъчно — нужна е обработка на цялото жилище.',
  },
  {
    photo: darvenicaPhoto,
    label: 'Дървеници',
    info: 'Хранят се с кръв през нощта и се разпространяват лесно чрез багаж, дрехи и мебели втора употреба. Изключително устойчиви на обикновени препарати — нужна е специализирана обработка.',
  },
  {
    photo: gryzachPhoto,
    label: 'Гризачи',
    info: 'Прегризват електрически кабели и изолация — честа причина за късо съединение и пожар. Замърсяват храна и повърхности с урина и изпражнения, пренасяйки опасни инфекции.',
  },
  {
    photo: karlezhPhoto,
    label: 'Кърлежи',
    info: 'Активни най-вече от пролетта до есента в тревисти и храстови площи. Пренасят Лаймска борелиоза, Кримска хеморагична треска и други сериозни заболявания за хора и домашни любимци.',
  },
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
  const [selected, setSelected] = useState(null)

  return (
    <section id="vreditelite" className="section pests">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Обхват</span>
          <RevealHeading>Вредители, с които <span className="accent-text">се справяме</span></RevealHeading>
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
            <motion.button
              type="button"
              key={p.label}
              className="pests__item"
              variants={item}
              whileHover={{ y: -6 }}
              onClick={() => setSelected(p)}
            >
              <span className="pests__icon pests__icon--photo">
                <img src={p.photo} alt={p.label} loading="lazy" />
              </span>
              <span className="pests__label">{p.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <PestModal pest={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

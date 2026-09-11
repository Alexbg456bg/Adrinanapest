import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconBug, IconRat, IconSpray, IconTick, IconChevronDown } from './icons.jsx'
import PestBackdrop from './PestBackdrop.jsx'
import hlebarkaPhoto from '../assets/pests/hlebarka.png'
import gryzachPhoto from '../assets/pests/gryzach.png'
import karlezhPhoto from '../assets/pests/karlezh.png'
import './Services.css'

const SERVICES = [
  {
    icon: IconSpray,
    title: 'Дезинфекция',
    desc: 'Унищожаване на болестотворни микроорганизми във външната среда — дизентерия, салмонелоза, вирусни хепатити, туберкулоза и SARS-CoV-2 (COVID-19).',
    more: 'Дезинфекцията редуцира количеството микроорганизми върху обработената повърхност с минимум 84–99% (при обикновено почистване ефектът е едва 50–80%). При епидемична обстановка или съмнение за особено опасна инфекция дезинфекционните мероприятия са задължителни по закон.',
    photo: null,
  },
  {
    icon: IconBug,
    title: 'Дезинсекция',
    desc: 'Пълно унищожаване на хлебарки, дървеници, мравки, бълхи, оси и комари — в жилища, офиси и производствени помещения.',
    more: 'Хлебарките пренасят патогенни микроорганизми (полиомиелит, дизентерия, коремен тиф) по повърхности и храна. За траен резултат третираме едновременно всички помещения в обекта — вкл. мазета, тавани и шахти — с интервал между обработките до 25–30 дни при по-висока заселеност.',
    photo: hlebarkaPhoto,
  },
  {
    icon: IconRat,
    title: 'Дератизация',
    desc: 'Контрол и унищожаване на гризачи — домашни, полски и горски мишки, сив и черен плъх — с изграждане на трайна защита.',
    more: 'Гризачите замърсяват храни и повърхности с косми, урина и изпражнения и са преносители на тежки заразни заболявания. Ключово условие за успех е изграждането на плъхонепроницаемост на обекта и редовен профилактичен мониторинг от лицензиран екип.',
    photo: gryzachPhoto,
  },
  {
    icon: IconTick,
    title: 'Дезакаризация',
    desc: 'Професионална обработка на дворове, градини, паркове и площадки срещу кърлежи — препоръчително пролет и есен.',
    more: 'Кърлежите пренасят опасни за хора и домашни любимци заболявания — Кримска хеморагична треска, Лаймска борелиоза, Ку-треска и др. Обработваме тревни площи и закрити пространства, за да предпазим семейството и любимците ви.',
    photo: karlezhPhoto,
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Services() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section id="uslugi" className="section services">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Какво предлагаме</span>
          <h2>ДДД услуги за <span className="accent-text">дом и бизнес</span></h2>
          <p>Пълен пакет услуги по <strong>Наредба № 1/2018</strong> на МЗ, съобразен с типа обект и степента на зараза.</p>
        </div>

        <motion.div
          className="services__grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {SERVICES.map((s, i) => {
            const open = openIdx === i
            return (
              <motion.div
                key={s.title}
                className="services__card"
                variants={cardVariant}
                whileHover={{ y: -8 }}
              >
                {s.photo && <PestBackdrop photo={s.photo} className="services__backdrop" />}
                <div className="services__icon">
                  <s.icon width={26} height={26} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.p
                      className="services__more"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      {s.more}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  className="services__link"
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                >
                  {open ? 'Скрий' : 'Виж повече'}
                  <IconChevronDown width={14} height={14} className={open ? 'is-open' : ''} />
                </button>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconBug, IconRat, IconSpray, IconTick } from './icons.jsx'
import RevealHeading from './RevealHeading.jsx'
import hlebarkaPhoto from '../assets/pests/hlebarka.jpg'
import gryzachPhoto from '../assets/pests/gryzach.jpg'
import karlezhPhoto from '../assets/pests/karlezh.jpg'
import disinfectPhoto from '../assets/team/warehouse-flashlight.jpg'
import { handleHashClick } from '../utils/scroll.js'
import './Services.css'

const SERVICES = [
  {
    icon: IconSpray,
    title: 'Дезинфекция',
    desc: 'Редуциране на болестотворни микроорганизми в работната среда — критично за хранително-вкусова промишленост, логистични обекти и здравни структури.',
    more: 'Дезинфекцията намалява микробния товар върху третираните повърхности значително в сравнение с обичайно почистване. При установен биологичен риск мероприятията са задължителни по закон и се документират с протокол.',
    photo: disinfectPhoto,
  },
  {
    icon: IconBug,
    title: 'Дезинсекция',
    desc: 'Контрол на хлебарки, мравки, бълхи и оси в производствени линии, складове и административни сгради — с фокус върху повторяемите огнища.',
    more: 'Хлебарките пренасят патогенни микроорганизми по повърхности и суровини — критичен риск за хранителни и логистични обекти. Третираме едновременно всички помещения на обекта, вкл. технически зони, с честота според степента на натовареност.',
    photo: hlebarkaPhoto,
  },
  {
    icon: IconRat,
    title: 'Дератизация',
    desc: 'Контрол и унищожаване на гризачи — полски и горски мишки, сив и черен плъх — с изграждане на трайна защита на обекта.',
    more: 'Гризачите застрашават суровини, оборудване и електрическа инсталация и са преносители на тежки инфекции. Ключово условие за резултат е плъхонепроницаемостта на обекта и редовен профилактичен мониторинг с водени контролни карти.',
    photo: gryzachPhoto,
  },
  {
    icon: IconTick,
    title: 'Дезакаризация',
    desc: 'Обработка на прилежащи терени, паркови зони и производствени площадки срещу кърлежи — сезонно, пролет и есен.',
    more: 'Кърлежите пренасят опасни за хора инфекции — Кримска хеморагична треска, Лаймска борелиоза, Ку-треска и др. Третираме тревни площи и периметъра на обекта, за да ограничим риска за персонала и посетителите.',
    photo: karlezhPhoto,
  },
]

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function Services() {
  const [active, setActive] = useState(0)
  const current = SERVICES[active]

  return (
    <section id="uslugi" className="section services">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Обхват на услугите</span>
          <RevealHeading>ДДД покритие за <span className="accent-text">производствени и корпоративни обекти</span></RevealHeading>
          <p>Прилагаме ДДД мерки по <strong>Наредба № 1/2018</strong> на МЗ, съобразени с профила на обекта, производствения режим и критичните точки за контрол.</p>
        </div>

        <div className="services-scrolly">
          <div className="services-scrolly__media">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.title}
                src={current.photo}
                alt={current.title}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </AnimatePresence>
            <div className="services-scrolly__media-overlay">
              <span className="services-scrolly__media-number">{pad(active + 1)} / {pad(SERVICES.length)}</span>
              <h3>{current.title}</h3>
            </div>
          </div>

          <div className="services-scrolly__list">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                className={`services-scrolly__row ${active === i ? 'is-active' : ''}`}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: '-45% 0px -45% 0px' }}
              >
                <img src={s.photo} alt={s.title} className="services-scrolly__row-photo" loading="lazy" />
                <div className="services-scrolly__top">
                  <span className="services-scrolly__icon">
                    <s.icon width={24} height={24} />
                  </span>
                  <span className="services-scrolly__number">{pad(i + 1)}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <p className="services-scrolly__more">{s.more}</p>
                <a href="#kontakti" className="services-scrolly__link" onClick={handleHashClick('#kontakti')}>
                  Запитване за {s.title.toLowerCase()} →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

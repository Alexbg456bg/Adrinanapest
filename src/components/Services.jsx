import { motion } from 'framer-motion'
import { IconBug, IconRat, IconSpray, IconTick, IconArrowRight } from './icons.jsx'
import RevealHeading from './RevealHeading.jsx'
import hlebarkaPhoto from '../assets/pests/hlebarka.jpg'
import gryzachPhoto from '../assets/pests/gryzach.jpg'
import karlezhPhoto from '../assets/pests/karlezh.jpg'
import disinfectPhoto from '../assets/team/warehouse-flashlight.jpg'
import { handleHashClick } from '../utils/scroll.js'
import BrandMotif from './BrandMotif.jsx'
import './Services.css'

const SERVICES = [
  {
    icon: IconSpray,
    cat: 'Микроорганизми',
    title: 'Дезинфекция',
    desc: 'Редуциране на болестотворни микроорганизми в работната среда — критично за хранително-вкусова промишленост, логистични обекти и здравни структури.',
    more: 'Дезинфекцията намалява микробния товар върху третираните повърхности значително в сравнение с обичайно почистване. При установен биологичен риск мероприятията са задължителни по закон и се документират с протокол.',
    photo: disinfectPhoto,
  },
  {
    icon: IconBug,
    cat: 'Насекоми',
    title: 'Дезинсекция',
    desc: 'Контрол на хлебарки, мравки, бълхи и оси в производствени линии, складове и административни сгради — с фокус върху повторяемите огнища.',
    more: 'Хлебарките пренасят патогенни микроорганизми по повърхности и суровини — критичен риск за хранителни и логистични обекти. Третираме едновременно всички помещения на обекта, вкл. технически зони, с честота според степента на натовареност.',
    photo: hlebarkaPhoto,
  },
  {
    icon: IconRat,
    cat: 'Гризачи',
    title: 'Дератизация',
    desc: 'Контрол и унищожаване на гризачи — полски и горски мишки, сив и черен плъх — с изграждане на трайна защита на обекта.',
    more: 'Гризачите застрашават суровини, оборудване и електрическа инсталация и са преносители на тежки инфекции. Ключово условие за резултат е плъхонепроницаемостта на обекта и редовен профилактичен мониторинг с водени контролни карти.',
    photo: gryzachPhoto,
  },
  {
    icon: IconTick,
    cat: 'Кърлежи',
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
  return (
    <section id="uslugi" className="section services">
      <BrandMotif className="brand-motif--services" />
      <BrandMotif className="brand-motif--services-left" />
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Обхват на услугите</span>
          <RevealHeading>ДДД покритие за <span className="accent-text">производствени и корпоративни обекти</span></RevealHeading>
          <p>Прилагаме ДДД мерки по <strong>Наредба № 1/2018</strong> на МЗ, съобразени с профила на обекта, производствения режим и критичните точки за контрол.</p>
        </div>

        <div className="services-stack">
          {SERVICES.map((s, i) => (
            <article key={s.title} className="service-card" style={{ '--i': i }}>
              <div className="service-card__media">
                <motion.img
                  src={s.photo}
                  alt={s.title}
                  loading="lazy"
                  decoding="async"
                  initial={{ scale: 1.12 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, margin: '-20% 0px' }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="service-card__body">
                <div className="service-card__top">
                  <span className="service-card__icon">
                    <s.icon width={22} height={22} />
                  </span>
                  <span className="service-card__num">{pad(i + 1)}</span>
                  <span className="service-card__cat">{s.cat}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <p className="service-card__more">{s.more}</p>
                <a href="#kontakti" className="service-card__link" onClick={handleHashClick('#kontakti')}>
                  Запитване за {s.title.toLowerCase()}
                  <IconArrowRight width={16} height={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
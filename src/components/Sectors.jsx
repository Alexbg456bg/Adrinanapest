import { IconBuilding, IconCertificate, IconSpray, IconPin, IconShield, IconStar, IconHome } from './icons.jsx'
import RevealHeading from './RevealHeading.jsx'
import TiltCard from './TiltCard.jsx'
import CarouselDots from './CarouselDots.jsx'
import BrandMotif from './BrandMotif.jsx'
import featurePhoto from '../assets/team/warehouse-spray.jpg'
import { useMobileCarousel } from './useMobileCarousel.js'
import './Sectors.css'

const SECTORS = [
  {
    icon: IconBuilding,
    title: 'Индустриални обекти',
    desc: 'Големи площи, производствени линии и непрекъснат режим.',
    examples: 'Преработка на текстил от втора употреба · лазерна обработка · дървопреработване',
  },
  {
    icon: IconCertificate,
    title: 'Обществени и административни обекти',
    desc: 'Планирани посещения и отчетност пред отговорните лица.',
    examples: 'Обществени приюти за животни · административни сгради · офиси',
  },
  {
    icon: IconSpray,
    title: 'Хранително-вкусова промишленост',
    desc: 'Хигиенни режими, критични точки и готовност за проверка.',
    examples: 'Месопреработвателни предприятия · кравеферми · оранжерийни комплекси',
  },
  {
    icon: IconPin,
    title: 'Логистика и складове',
    desc: 'Входящи доставки, периметър и защита на стоките.',
    examples: 'Куриерско-спедиторски логистични центрове · складови бази',
  },
  {
    icon: IconShield,
    title: 'Здравни и социални структури',
    desc: 'Биосигурност, чувствителни групи и работни протоколи.',
    examples: 'Лечебни заведения · социални услуги · центрове за грижа',
  },
  {
    icon: IconStar,
    title: 'Хотели и ресторанти',
    desc: 'Планиран контрол, хигиенна защита и грижа за репутацията.',
    examples: 'Хотели · места за настаняване · ресторанти · барове · хранителни магазини · професионални кухни',
  },
  {
    icon: IconHome,
    title: 'Частни домове',
    desc: 'Оценка на риска, безопасно третиране и ясни указания.',
    examples: 'Апартаменти · къщи · дворове · общи части',
  },
]

export default function Sectors() {
  const { ref: carouselRef, active, scrollToIndex } = useMobileCarousel(SECTORS.length)

  return (
    <section id="sektori" className="section section-alt sectors">
      <BrandMotif className="brand-motif--sectors" />
      <BrandMotif className="brand-motif--sectors-left" />
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Обществени, корпоративни и частни обекти</span>
          <RevealHeading>ДДД мерките се определят <span className="accent-text">според спецификата на обекта</span></RevealHeading>
          <p>Обработките се планират според дейността и работния режим. Присъствието на хора и животни определя организацията и мерките за безопасност.</p>
        </div>

        <div className="sectors__grid" ref={carouselRef}>
          {SECTORS.map((s, i) => (
            <TiltCard
              key={s.title}
              className={`sectors__card ${i === 0 ? 'sectors__card--feature' : ''}`}
              maxTilt={6}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
            >
              {i === 0 && (
                <>
                  <img className="sectors__feature-img" src={featurePhoto} alt="" loading="lazy" />
                  <span className="sectors__feature-shade" aria-hidden="true" />
                </>
              )}
              <span className="sectors__icon">
                <s.icon width={24} height={24} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <p className="sectors__examples">{s.examples}</p>
            </TiltCard>
          ))}
        </div>
        <CarouselDots count={SECTORS.length} active={active} onSelect={scrollToIndex} />
      </div>
    </section>
  )
}

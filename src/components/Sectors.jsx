import { IconBuilding, IconCertificate, IconSpray, IconPin, IconShield, IconStar } from './icons.jsx'
import RevealHeading from './RevealHeading.jsx'
import TiltCard from './TiltCard.jsx'
import CarouselDots from './CarouselDots.jsx'
import BrandMotif from './BrandMotif.jsx'
import { useMobileCarousel } from './useMobileCarousel.js'
import './Sectors.css'

const SECTORS = [
  {
    icon: IconBuilding,
    title: 'Индустриални обекти',
    desc: 'Големи площи, производствени линии и непрекъснат режим.',
  },
  {
    icon: IconCertificate,
    title: 'Обществени и административни обекти',
    desc: 'Планирани посещения и отчетност пред отговорните лица.',
  },
  {
    icon: IconSpray,
    title: 'Хранително-вкусова промишленост',
    desc: 'Хигиенни режими, критични точки и готовност за проверка.',
  },
  {
    icon: IconPin,
    title: 'Логистика и складове',
    desc: 'Входящи доставки, периметър и защита на стоките.',
  },
  {
    icon: IconShield,
    title: 'Здравеопазване и социални структури',
    desc: 'Биосигурност, чувствителни групи и работни протоколи.',
  },
  {
    icon: IconStar,
    title: 'Хотели и ресторанти',
    desc: 'Дискретна работа, превенция и защита на репутацията.',
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
          <span className="eyebrow">Обществени и корпоративни обекти</span>
          <RevealHeading>Всеки обект има <span className="accent-text">различен режим на работа</span></RevealHeading>
          <p>Мерките и честотата се определят според предназначението, работния режим и присъствието на хора и животни.</p>
        </div>

        <div className="sectors__grid" ref={carouselRef}>
          {SECTORS.map((s, i) => (
            <TiltCard
              key={s.title}
              className="sectors__card"
              maxTilt={6}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <span className="sectors__icon">
                <s.icon width={24} height={24} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </TiltCard>
          ))}
        </div>
        <CarouselDots count={SECTORS.length} active={active} onSelect={scrollToIndex} />
      </div>
    </section>
  )
}

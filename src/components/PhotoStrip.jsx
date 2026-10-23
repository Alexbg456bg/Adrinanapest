import { motion } from 'framer-motion'
import curtainPhoto from '../assets/photos/curtain-entrance.webp'
import fencePhoto from '../assets/photos/fence-perimeter-fogging.webp'
import cleanroomPhoto from '../assets/photos/cleanroom-fogger.webp'
import teamPhoto from '../assets/photos/team-duo.webp'
import './PhotoStrip.css'

// Лента от четири малки снимки една до друга — по модела на референтния сайт
// на клиентката (индустриален обект, обществен обект, хранителна среда, екип).
const PHOTOS = [
  { src: curtainPhoto, position: 'center 66%', alt: 'Специалист в защитно облекло излиза през индустриална завеса' },
  { src: fencePhoto, position: 'center 42%', alt: 'Професионална обработка на територията на обществен обект' },
  { src: cleanroomPhoto, position: 'center 30%', alt: 'Специалист на АДРИНА в производствена среда за храни' },
  { src: teamPhoto, position: 'center 28%', alt: 'Екип на АДРИНА за професионален контрол на вредители' },
]

export default function PhotoStrip() {
  return (
    <section className="photo-strip section-alt" aria-label="АДРИНА на терен">
      <div className="container photo-strip__row">
        {PHOTOS.map((p, i) => (
          <motion.figure
            key={p.src}
            className="photo-strip__item"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <img src={p.src} alt={p.alt} style={{ objectPosition: p.position }} loading="lazy" decoding="async" />
          </motion.figure>
        ))}
      </div>
    </section>
  )
}

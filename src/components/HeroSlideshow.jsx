import heroPhoto from '../assets/photos/curtain-entrance.webp'
import './HeroSlideshow.css'

// Заглавната снимка (по желание на клиентката) е една и статична —
// специалистката с кофата, която излиза през индустриалната завеса,
// без смяна на кадри и без анимация.
export default function HeroSlideshow() {
  return (
    <div className="hero-slideshow" aria-hidden="true">
      <img
        className="hero-slideshow__img is-static"
        src={heroPhoto}
        alt=""
        decoding="async"
        fetchpriority="high"
      />
      <div className="hero-slideshow__scrim" />
    </div>
  )
}

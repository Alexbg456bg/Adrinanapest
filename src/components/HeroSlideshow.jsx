import kitchenInspectionPhoto from '../assets/photos/kitchen-monitoring-inspection.webp'
import './HeroSlideshow.css'

// Заглавната снимка (по желание на клиентката) е една и статична —
// специалистката с опашката в кухнята, без смяна на кадри и без анимация.
// На телефон кадърът се центрира върху нея (дясната част на снимката).
export default function HeroSlideshow() {
  return (
    <div className="hero-slideshow" aria-hidden="true">
      <img
        className="hero-slideshow__img is-static"
        src={kitchenInspectionPhoto}
        alt=""
        decoding="async"
        fetchpriority="high"
      />
      <div className="hero-slideshow__scrim" />
    </div>
  )
}

import './CarouselDots.css'

// Точки-индикатор под мобилните swipe-карусели — показват колко елемента
// има и на кой е потребителят, и позволяват директен скок с тап. Скрити на
// desktop, където съответната секция е обикновена решетка, не карусел.
export default function CarouselDots({ count, active, onSelect }) {
  return (
    <div className="carousel-dots" role="tablist" aria-label="Позиция в списъка">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-label={`Елемент ${i + 1} от ${count}`}
          className={`carousel-dots__dot ${i === active ? 'is-active' : ''}`}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  )
}

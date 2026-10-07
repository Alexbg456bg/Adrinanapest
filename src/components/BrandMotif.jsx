import { useEffect, useRef } from 'react'

// Едва забележим декоративен шестоъгълник, повтарящ формата от логото —
// дискретна визуална връзка между марката и фона, само на desktop. Бавно се
// върти (100s/оборот) — почти невидимо кадър по кадър, но дава "жив" фон.
// Въртенето е на пауза, докато мотивът е извън екрана — иначе 16 такива
// безкрайни анимации тикат непрекъснато, без никой да ги вижда.
export default function BrandMotif({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        el.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused'
      },
      { rootMargin: '120px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <svg ref={ref} className={`brand-motif ${className}`} viewBox="0 0 300 300" aria-hidden="true">
      <path d="M0-132 114-66v132L0 132-114 66V-66Z" transform="translate(150 150)" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

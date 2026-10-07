import { useEffect, useRef } from 'react'
import './CursorGlow.css'

// Меко "сияние", което следва курсора само над секции с клас .has-cursor-accent
// (Hero, Stats, WhyUs, Spotlight, Contact, Footer) — само на desktop с мишка.
// Само едно DOM копие за целия сайт, позиционирано спрямо viewport-а, вместо
// по едно на секция, за да не се блъска с ::before/::after, които някои от
// тези секции вече ползват за собствените си фонови ефекти.
export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    const el = ref.current
    if (!el) return undefined
    let active = false
    let frame = 0
    let lastEvent = null

    // Събитията се събират и обработват най-много веднъж на кадър —
    // pointermove може да стреля стотици пъти в секунда.
    const apply = () => {
      frame = 0
      const e = lastEvent
      if (!e) return
      const overTarget = Boolean(e.target.closest?.('.has-cursor-accent'))
      if (overTarget !== active) {
        active = overTarget
        el.style.opacity = overTarget ? '1' : '0'
      }
      if (overTarget) {
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }
    const onMove = (e) => {
      lastEvent = e
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      active = false
      lastEvent = null
      el.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <div className="cursor-glow" ref={ref} aria-hidden="true" />
}

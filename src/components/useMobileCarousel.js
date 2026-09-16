import { useEffect, useRef, useState } from 'react'

// Споделена логика за мобилните хоризонтални "swipe" карусели (Process,
// Sectors): следи кой елемент е най-близо в изгледа, за да движи точките-
// индикатор, и при първото влизане в секцията леко побутва реда встрани и
// обратно — визуален знак, че картите се плъзгат, не просто статичен списък.
export function useMobileCarousel(count) {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const hinted = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || count === 0) return undefined

    const onScroll = () => {
      const cardWidth = el.scrollWidth / count
      const idx = Math.round(el.scrollLeft / cardWidth)
      setActive(Math.min(count - 1, Math.max(0, idx)))
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hinted.current || window.innerWidth > 560) return
        hinted.current = true
        el.scrollTo({ left: 46, behavior: 'smooth' })
        setTimeout(() => el.scrollTo({ left: 0, behavior: 'smooth' }), 550)
      },
      { threshold: 0.6 }
    )

    el.addEventListener('scroll', onScroll, { passive: true })
    io.observe(el)
    return () => {
      el.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [count])

  const scrollToIndex = (i) => {
    const el = ref.current
    if (!el) return
    const cardWidth = el.scrollWidth / count
    el.scrollTo({ left: cardWidth * i, behavior: 'smooth' })
  }

  return { ref, active, scrollToIndex }
}

import { useEffect, useRef } from 'react'
import './CustomCursor.css'

// Малка teal точка, която се появява само над тъмните секции (елементи с
// клас .has-cursor-accent) — не крие истинския курсор, само добавя акцент.
export default function CustomCursor() {
  const dotRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined

    const dot = dotRef.current
    let raf = null

    const move = (e) => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        dot.style.opacity = e.target.closest('.has-cursor-accent') ? '1' : '0'
      })
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={dotRef} className="custom-cursor" aria-hidden="true" />
}

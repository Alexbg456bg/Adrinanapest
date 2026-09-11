import { useRef } from 'react'
import './Magnetic.css'

// Лек „магнитен" ефект — елементът леко следва курсора при hover (само desktop).
export default function Magnetic({ children, strength = 16, className = '' }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el || !window.matchMedia('(pointer: fine)').matches) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${x / strength}px, ${y / strength}px)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <span
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </span>
  )
}

import { useEffect, useId, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import './SprayReveal.css'

// "Спрей" ефект на разкриване — съдържанието се появява през растящи капки
// (SVG маска), вместо обикновен fade, докато влиза в изгледа при скрол.
const DROPLETS = [
  { x: 0.12, y: 0.22, delay: 0 },
  { x: 0.48, y: 0.08, delay: 0.06 },
  { x: 0.83, y: 0.2, delay: 0.12 },
  { x: 0.25, y: 0.52, delay: 0.05 },
  { x: 0.63, y: 0.42, delay: 0.16 },
  { x: 0.93, y: 0.58, delay: 0.1 },
  { x: 0.06, y: 0.7, delay: 0.2 },
  { x: 0.38, y: 0.82, delay: 0.14 },
  { x: 0.78, y: 0.88, delay: 0.22 },
  { x: 0.5, y: 0.5, delay: 0.18 },
]

export default function SprayReveal({ children, className = '' }) {
  const rawId = useId()
  const maskId = `spray-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`
  const wrapRef = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const inView = useInView(wrapRef, { once: true, margin: '-10% 0px -10% 0px' })

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return undefined
    const update = () => setSize({ w: el.offsetWidth, h: el.offsetHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const maxR = Math.hypot(size.w, size.h) * 0.62

  return (
    <div
      ref={wrapRef}
      className={`spray-reveal ${className}`}
      style={size.w > 0 ? { WebkitMaskImage: `url(#${maskId})`, maskImage: `url(#${maskId})` } : undefined}
    >
      {size.w > 0 && (
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={size.w} height={size.h}>
              <rect x="0" y="0" width={size.w} height={size.h} fill="#000" />
              {DROPLETS.map((d, i) => (
                <motion.circle
                  key={i}
                  cx={d.x * size.w}
                  cy={d.y * size.h}
                  fill="#fff"
                  initial={{ r: 0 }}
                  animate={{ r: inView ? maxR : 0 }}
                  transition={{ duration: 0.85, delay: d.delay, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
            </mask>
          </defs>
        </svg>
      )}
      {children}
    </div>
  )
}

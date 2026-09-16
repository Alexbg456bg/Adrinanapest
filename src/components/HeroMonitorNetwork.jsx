import { useEffect, useState } from 'react'
import './HeroMonitorNetwork.css'

// Свързва действителните позиции на "Дезинсекция/Дератизация/Дезинфекция/
// Дезакаризация" плочките (badge-овете в hero__visual-caption) с тънка SVG
// мрежа от точки — те седят в динамичен flex ред с wrap, така че нямат
// фиксирани x/y координати; измерваме реалните им позиции в браузъра
// (getBoundingClientRect), вместо да гадаем пиксели.
export default function HeroMonitorNetwork({ containerRef, targetRefs }) {
  const [points, setPoints] = useState(null)

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current
      const targets = targetRefs.current.filter(Boolean)
      if (!container || targets.length < 2) return

      const containerRect = container.getBoundingClientRect()
      const next = targets.map((el) => {
        const r = el.getBoundingClientRect()
        return { x: r.left - containerRect.left - 3, y: r.top - containerRect.top - 3 }
      })
      setPoints(next)
    }

    measure()
    // Малко закъснение — badge-овете се появяват със staggered fade/y анимация
    // (виж container/item variants-ите в Hero.jsx) и позицията им се "уляга"
    // за частица от секундата след първия рендер.
    const settleTimer = setTimeout(measure, 350)

    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', measure)

    return () => {
      clearTimeout(settleTimer)
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [containerRef, targetRefs])

  if (!points || points.length < 2) return null

  const lines = points.slice(1).map((p, i) => [points[i], p])

  return (
    <svg className="hero-network" aria-hidden="true">
      {lines.map(([a, b], i) => {
        const length = Math.hypot(b.x - a.x, b.y - a.y)
        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            className="hero-network__line"
            style={{
              '--dash-length': length,
              '--dash-delay': `${0.15 + i * 0.22}s`,
            }}
          />
        )
      })}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3.5"
          className="hero-network__dot"
          style={{ '--dot-delay': `${0.9 + i * 0.18}s` }}
        />
      ))}
    </svg>
  )
}

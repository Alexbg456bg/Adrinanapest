import { Children, isValidElement } from 'react'
import { motion } from 'framer-motion'
import './RevealHeading.css'

// Разбива децата на елемента на думи и обвива всяка в motion.span с маска
// (overflow:hidden), за да "изгрява" ред по ред при влизане в изгледа —
// вдъхновено от word-reveal ефекта на https://microbiolab-bg.com/.
function renderWords(children, idxRef) {
  const out = []

  Children.forEach(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      String(child).split(/(\s+)/).forEach((part, i) => {
        if (part === '') return
        if (/^\s+$/.test(part)) {
          out.push(<span key={`sp-${idxRef.i}-${i}`}>&nbsp;</span>)
          return
        }
        const current = idxRef.i++
        out.push(
          <span key={`w-${current}`} className="reveal-word__mask">
            <motion.span
              className="reveal-word"
              initial={{ opacity: 0, y: '0.65em' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: current * 0.045 }}
            >
              {part}
            </motion.span>
          </span>
        )
      })
    } else if (isValidElement(child)) {
      const innerWords = renderWords(child.props.children, idxRef)
      out.push(
        <span key={`e-${idxRef.i}`} className={child.props.className}>
          {innerWords}
        </span>
      )
    }
  })

  return out
}

export default function RevealHeading({ as: Tag = 'h2', children, className = '' }) {
  const idxRef = { i: 0 }
  const words = renderWords(children, idxRef)
  return <Tag className={className}>{words}</Tag>
}

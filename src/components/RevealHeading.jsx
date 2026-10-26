import { Children, isValidElement } from 'react'
import { motion } from 'framer-motion'
import './RevealHeading.css'

// Разбива децата на елемента на думи и обвива всяка в motion.span с маска
// (overflow:hidden), за да "изгрява" ред по ред при влизане в изгледа —
// вдъхновено от word-reveal ефекта на https://microbiolab-bg.com/.
// Нарочно само вертикален viewport margin: '-80px' изрязва и страничните
// ръбове на екрана и къси думи в началото на ред ("с", "и", "на") никога не
// се засичаха като видими — оставаха невидими (на телефон липсваше "с").
// Общото забавяне е ограничено, за да приключи ефектът за около секунда.
const WORD_DELAY = 0.03
const MAX_DELAY = 0.3

function renderWords(children, idxRef) {
  const out = []

  Children.forEach(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      String(child).split(/(\s+)/).forEach((part, i) => {
        if (part === '') return
        // Обикновен интервал (не &nbsp;): при пренасяне на нов ред се свива и
        // не измества първата дума навътре спрямо останалите редове.
        if (/^\s+$/.test(part)) {
          out.push(' ')
          return
        }
        const current = idxRef.i++
        out.push(
          <span key={`w-${current}`} className="reveal-word__mask">
            <motion.span
              className="reveal-word"
              initial={{ opacity: 0, y: '0.65em' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: Math.min(current * WORD_DELAY, MAX_DELAY) }}
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

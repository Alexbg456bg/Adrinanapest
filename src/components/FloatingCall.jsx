import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconPhone } from './icons.jsx'
import './FloatingCall.css'

export default function FloatingCall() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="tel:+359887803023"
          className="floating-call"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          aria-label="Обадете се сега на 0887 803 023"
        >
          <span className="floating-call__pulse" aria-hidden="true" />
          <IconPhone width={22} height={22} />
          <span className="floating-call__text">Обадете се сега</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}

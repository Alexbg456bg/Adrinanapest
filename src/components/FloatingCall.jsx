import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconPhone } from './icons.jsx'
import './FloatingCall.css'

export default function FloatingCall() {
  const [visible, setVisible] = useState(false)
  const [tapKey, setTapKey] = useState(0)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="floating-call-wrap"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {/* Тласък при тап, отделен от постоянния ambient пулс — потвърждава
              физически, че докосването е регистрирано, преди да се отвори
              системният номератор. Разгъва се извън кръга (wrap-ът няма
              overflow:hidden), за да се усети като истински "ping". */}
          <AnimatePresence>
            {tapKey > 0 && (
              <motion.span
                key={tapKey}
                className="floating-call__tap-pulse"
                aria-hidden="true"
                initial={{ scale: 0.9, opacity: 0.6 }}
                animate={{ scale: 1.9, opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>
          <a
            href="tel:+359887803023"
            className="floating-call"
            aria-label="Обадете се сега на 0887 803 023"
            onClick={() => setTapKey((k) => k + 1)}
          >
            <span className="floating-call__pulse" aria-hidden="true" />
            <IconPhone width={22} height={22} />
            <span className="floating-call__text">Обадете се сега</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

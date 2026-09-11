import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconX } from './icons.jsx'
import './PestModal.css'

export default function PestModal({ pest, onClose }) {
  useEffect(() => {
    if (!pest) return
    document.body.classList.add('pest-modal-open')
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('pest-modal-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [pest, onClose])

  return (
    <AnimatePresence>
      {pest && (
        <motion.div
          className="pest-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="pest-modal"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="pest-modal__close" onClick={onClose} aria-label="Затвори">
              <IconX width={18} height={18} />
            </button>

            <div className="pest-modal__photo">
              <img src={pest.photo} alt={pest.label} />
            </div>

            <div className="pest-modal__body">
              <h3>{pest.label}</h3>
              <p>{pest.info}</p>
              <a href="#kontakti" className="btn btn-primary" onClick={onClose}>
                Заявете обработка
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

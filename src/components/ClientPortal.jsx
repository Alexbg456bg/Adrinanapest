import { useState } from 'react'
import { motion } from 'framer-motion'
import { IconLock, IconCheck } from './icons.jsx'
import RevealHeading from './RevealHeading.jsx'
import { handleHashClick } from '../utils/scroll.js'
import './ClientPortal.css'

const FEATURES = ['Протоколи', 'Картосхеми', 'График на обработките', 'История на мероприятията']

// Само интерфейсът на портала: вход с индивидуален код. Все още няма сървърна
// част, която да проверява кодове и да отдава документи, затова формата НЕ
// "влиза" никого и не приема произволен код — показва честно съобщение.
export default function ClientPortal() {
  const [code, setCode] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!code.trim()) return
    setSubmitted(true)
  }

  return (
    <section id="portal" className="section portal">
      <div className="container">
        <motion.div
          className="portal__panel has-grain"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="portal__copy">
            <span className="portal__eyebrow">
              <IconLock width={15} height={15} />
              Защитена клиентска зона
            </span>
            <RevealHeading className="portal__title">Документите за вашия обект на едно място.</RevealHeading>
            <p>
              Всеки договорен клиент получава индивидуален код за достъп до досието на обслужвания
              обект.
            </p>
            <ul className="portal__features">
              {FEATURES.map((f) => (
                <li key={f}>
                  <IconCheck width={15} height={15} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <form className="portal__form" onSubmit={handleSubmit}>
            <label htmlFor="portal-code">Индивидуален клиентски код</label>
            <input
              id="portal-code"
              name="code"
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setSubmitted(false)
              }}
              autoComplete="off"
              spellCheck={false}
              placeholder="Въведете вашия код"
            />
            <button type="submit" className="btn btn-primary portal__submit">
              <IconLock width={16} height={16} />
              Вход в портала
            </button>

            {submitted ? (
              <p className="portal__notice" role="status">
                Клиентският портал още се подготвя. Достъпът се активира индивидуално от АДРИНА за
                всеки договорен клиент —{' '}
                <a href="#kontakti" onClick={handleHashClick('#kontakti')}>свържете се с нас</a>
                {' '}за вашия код.
              </p>
            ) : (
              <p className="portal__hint">Достъпът се активира индивидуално от АДРИНА за всеки договорен клиент.</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { IconPhone, IconMail, IconPin, IconClock, IconSpray } from './icons.jsx'
import Magnetic from './Magnetic.jsx'
import PestBackdrop from './PestBackdrop.jsx'
import RevealHeading from './RevealHeading.jsx'
import vanInspectionPhoto from '../assets/team/van-inspection.jpg'
import './Contact.css'

const CONTACT_INFO = {
  phone: '0887 803 023',
  phone2: '0884 388 435',
  email: 'adrinapest@gmail.com',
  address: 'ул. „Цар Самуил“ 109, гр. София',
}

const SERVICES = ['Дезинсекция', 'Дератизация', 'Дезинфекция', 'Дезакаризация', 'Друго']

const EMPTY_FORM = { name: '', phone: '', email: '', service: SERVICES[0], message: '', _gotcha: '' }

// Ъгли на "капките" при пръскащата анимация след успешно изпращане.
const SPRAY_ANGLES = [-48, -28, -8, 12, 32, 50, 2]

// Формата изпраща директно през Formspree (без нужда от бекенд/PHP хостинг) —
// работи еднакво в локална разработка и на живо. Имейлът, на който пристигат
// заявките, се управлява от настройките на формуляра в dashboard-а на Formspree
// (formspree.io/forms), не от кода — смяната на получателя не изисква редеплой.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xljeyreq'

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  // След успешно изпращане пуска кратка "пръскаща" анимация, после нулира
  // формата, за да може да се изпрати ново запитване.
  useEffect(() => {
    if (status !== 'sent') return undefined
    const timer = setTimeout(() => {
      setStatus('idle')
      setForm(EMPTY_FORM)
    }, 1900)
    return () => clearTimeout(timer)
  }, [status])

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form._gotcha) return // honeypot — бот попълнил скрито поле
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: `Ново запитване — ${form.service}` }),
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="kontakti" className="section contact">
      <div className="container contact__inner has-cursor-accent">
        <PestBackdrop photo={vanInspectionPhoto} className="contact__backdrop" />
        <div className="contact__grid" aria-hidden="true" />

        <motion.div
          className="contact__info"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow eyebrow--light">Контакти</span>
          <RevealHeading>Заявете оглед <span className="accent-text">на обекта</span></RevealHeading>
          <p className="contact__lead">
            Свържете се с нас по телефон, имейл или чрез формата. Работим без ограничение
            в региона — отговаряме бързо на всяко запитване.
          </p>

          <ul className="contact__list">
            <li>
              <span className="contact__list-icon"><IconPhone width={18} height={18} /></span>
              <div className="contact__list-text">
                <a href={`tel:+359${CONTACT_INFO.phone.replace(/^0/, '').replace(/\s/g, '')}`}>{CONTACT_INFO.phone}</a>
                <span className="contact__sep">/</span>
                <a href={`tel:+359${CONTACT_INFO.phone2.replace(/^0/, '').replace(/\s/g, '')}`}>{CONTACT_INFO.phone2}</a>
              </div>
            </li>
            <li>
              <span className="contact__list-icon"><IconMail width={18} height={18} /></span>
              <div className="contact__list-text">
                <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
              </div>
            </li>
            <li>
              <span className="contact__list-icon"><IconPin width={18} height={18} /></span>
              <div className="contact__list-text">
                <span>{CONTACT_INFO.address}</span>
              </div>
            </li>
            <li>
              <span className="contact__list-icon"><IconClock width={18} height={18} /></span>
              <div className="contact__list-text">
                <span>На разположение при спешност</span>
              </div>
            </li>
          </ul>

          <div className="contact__trust">
            <div className="contact__trust-item">
              <strong>23</strong>
              <span>години опит</span>
            </div>
            <div className="contact__trust-item">
              <strong>Протокол</strong>
              <span>и фактура</span>
            </div>
            <div className="contact__trust-item">
              <strong>Без граница</strong>
              <span>в региона</span>
            </div>
            <div className="contact__trust-item">
              <strong>24 ч.</strong>
              <span>реакция при спешност</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          className="contact__form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {status === 'sent' ? (
            <motion.div
              className="contact__success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="contact__spray" aria-hidden="true">
                <motion.div
                  className="contact__spray-icon"
                  animate={{ rotate: [0, -14, 10, -6, 0] }}
                  transition={{ duration: 0.55, ease: 'easeInOut' }}
                >
                  <IconSpray width={40} height={40} />
                </motion.div>
                {SPRAY_ANGLES.map((angle, i) => {
                  const rad = (angle * Math.PI) / 180
                  const dist = 60 + (i % 3) * 12
                  return (
                    <motion.span
                      key={i}
                      className="contact__droplet"
                      initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                      animate={{
                        opacity: [0, 1, 0],
                        x: Math.cos(rad) * dist,
                        y: Math.sin(rad) * dist,
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{ duration: 0.65, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
                    />
                  )
                })}
              </div>
              <motion.h3 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                Изпратено!
              </motion.h3>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                Ще се свържем с вас възможно най-скоро.
              </motion.p>
            </motion.div>
          ) : (
            <>
              {/* honeypot — скрито за хора, ботовете обикновено го попълват */}
              <input
                type="text"
                name="_gotcha"
                value={form._gotcha}
                onChange={handleChange}
                className="contact__honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="field">
                <input required name="name" value={form.name} onChange={handleChange} placeholder=" " />
                <label>Име</label>
              </div>
              <div className="field">
                <input required name="phone" value={form.phone} onChange={handleChange} placeholder=" " />
                <label>Телефон</label>
              </div>
              <div className="field">
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder=" " />
                <label>Имейл (незадължително)</label>
              </div>
              <label className="field field--select">
                Услуга
                <select name="service" value={form.service} onChange={handleChange}>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
              <div className="field">
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder=" "
                />
                <label>Съобщение</label>
              </div>

              {status === 'error' && (
                <p className="contact__error">
                  Възникна грешка при изпращането. Опитайте отново или се обадете на {CONTACT_INFO.phone}.
                </p>
              )}

              <Magnetic strength={22} className="contact__submit-wrap">
                <button type="submit" className="btn btn-primary contact__submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Изпращане…' : 'Изпрати заявка'}
                </button>
              </Magnetic>
            </>
          )}
        </motion.form>
      </div>
    </section>
  )
}

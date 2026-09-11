import { useState } from 'react'
import { motion } from 'framer-motion'
import { IconPhone, IconMail, IconPin, IconClock } from './icons.jsx'
import Magnetic from './Magnetic.jsx'
import PestBackdrop from './PestBackdrop.jsx'
import RevealHeading from './RevealHeading.jsx'
import vanInspectionPhoto from '../assets/team/van-inspection.jpg'
import './Contact.css'

const CONTACT_INFO = {
  phone: '0887 803 023',
  phone2: '0884 388 435',
  email: 'adrinapest@gmail.com',
  address: 'гр. София — обслужваме целия град',
  // TODO: потвърдете точното работно време с клиента
  hours: 'Пон–Съб: 08:00 – 19:00',
}

const SERVICES = ['Дезинсекция', 'Дератизация', 'Дезинфекция', 'Дезакаризация', 'Друго']

/*
  Хостингът е SuperHosting (споделен PHP хостинг, без база данни), затова формата
  изпраща заявката към public/contact.php чрез fetch — при качване на dist/ на
  хостинга, contact.php застава на същия път и изпраща имейл до CONTACT_INFO.email.
  При локална разработка (npm run dev) заявката ще върне грешка, тъй като Vite
  не изпълнява PHP — това е очаквано, тества се само след качване на хостинга.
*/

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: SERVICES[0], message: '', company: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.company) return // honeypot — бот попълнил скрито поле
    setStatus('sending')
    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.success) {
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
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">Контакти</span>
          <RevealHeading>Заявете оглед <span className="accent-text">още днес</span></RevealHeading>
          <p className="contact__lead">
            Свържете се с нас по телефон, имейл или чрез формата — отговаряме бързо.
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
                <span>{CONTACT_INFO.hours}</span>
              </div>
            </li>
          </ul>

          <div className="contact__trust">
            <div className="contact__trust-item">
              <strong>20+</strong>
              <span>години опит</span>
            </div>
            <div className="contact__trust-item">
              <strong>№ 2-25</strong>
              <span>лиценз от 2005 г.</span>
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
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {status === 'sent' ? (
            <motion.div
              className="contact__success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <svg className="contact__success-check" viewBox="0 0 64 64" fill="none">
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="var(--color-accent)"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <motion.path
                  d="M20 33.5 28 41 44 24"
                  stroke="var(--color-accent)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
                />
              </svg>
              <h3>Благодарим ви!</h3>
              <p>Заявката е изпратена. Ще се свържем с вас възможно най-скоро.</p>
            </motion.div>
          ) : (
            <>
              {/* honeypot — скрито за хора, ботовете обикновено го попълват */}
              <input
                type="text"
                name="company"
                value={form.company}
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

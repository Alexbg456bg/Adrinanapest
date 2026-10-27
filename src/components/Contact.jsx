import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { IconPhone, IconMail, IconPin, IconClock } from './icons.jsx'
import Magnetic from './Magnetic.jsx'
import PestBackdrop from './PestBackdrop.jsx'
import RevealHeading from './RevealHeading.jsx'
import vanInspectionPhoto from '../assets/photos/mall-treatment-team.webp'
import sprayerVideo from '../assets/video/sprayer.mp4'
import './Contact.css'

const CONTACT_INFO = {
  phone: '0887 803 023',
  phone2: '0884 388 435',
  email: 'adrinapest@gmail.com',
  address: 'гр. София',
}

const SERVICES = ['Дезинсекция', 'Дератизация', 'Дезинфекция', 'Дезакаризация', 'Друго']

const EMPTY_FORM = { name: '', organization: '', phone: '', email: '', service: SERVICES[0], message: '', _gotcha: '' }

// В продукция (cPanel) запитванията отиват към собствения /contact.php, който ги
// изпраща по имейл до фирмената поща. Локалната разработка (`npm run dev`) няма
// PHP и затова ползва Formspree — получателят там се задава в dashboard-а на
// Formspree (formspree.io/forms), не от кода.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xljeyreq'
const FORM_ENDPOINT = import.meta.env.PROD ? '/contact.php' : FORMSPREE_ENDPOINT

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
    }, 4200)
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
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: `Ново запитване — ${form.service}` }),
      })
      // Успех само ако отговорът е JSON с success/ok — иначе хостингът може да
      // върне 200 с HTML грешка (напр. PHP не се изпълнява) и да излъжем клиента.
      const result = await res.json().catch(() => null)
      if (res.ok && result && (result.success === true || result.ok === true)) {
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
      <div className="container contact__inner has-cursor-accent has-grain">
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
            Изпратете информация за обекта по телефон, имейл или чрез формата. АДРИНА отговаря
            бързо на всяко запитване.
          </p>

          <ul className="contact__list">
            <li>
              <span className="contact__list-icon"><IconPhone width={18} height={18} /></span>
              <div className="contact__list-text">
                <a href={`tel:+359${CONTACT_INFO.phone.replace(/^0/, '').replace(/\s/g, '')}`}>{CONTACT_INFO.phone}</a>
                <a className="contact__phone2" href={`tel:+359${CONTACT_INFO.phone2.replace(/^0/, '').replace(/\s/g, '')}`}>{CONTACT_INFO.phone2}</a>
              </div>
            </li>
            <li>
              <span className="contact__list-icon"><IconMail width={18} height={18} /></span>
              <div className="contact__list-text">
                <a href={`mailto:${CONTACT_INFO.email}`}>
                  {CONTACT_INFO.email.split('@')[0]}@<wbr />{CONTACT_INFO.email.split('@')[1]}
                </a>
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
                <span>Приоритетна реакция при спешни случаи</span>
              </div>
            </li>
          </ul>
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
                <video
                  className="contact__spray-video"
                  src={sprayerVideo}
                  autoPlay
                  muted
                  playsInline
                  disablePictureInPicture
                />
              </div>
              <motion.h3 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.7 }}>
                Изпратено!
              </motion.h3>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.85 }}>
                Запитването е получено — АДРИНА ще се свърже с вас възможно най-скоро.
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
                <input name="organization" value={form.organization} onChange={handleChange} placeholder=" " />
                <label>Организация (незадължително)</label>
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
                  {status === 'sending' ? (
                    <span className="contact__submit-loading">
                      <span className="contact__spinner" aria-hidden="true" />
                      Изпращане…
                    </span>
                  ) : (
                    'Изпрати заявка'
                  )}
                </button>
              </Magnetic>

              <p className="contact__privacy">
                С изпращането на запитването се съгласявате АДРИНА ООД да използва подадените данни
                само за връзка с вас по него. Данните не се предоставят на трети лица.
              </p>
            </>
          )}
        </motion.form>
      </div>
    </section>
  )
}

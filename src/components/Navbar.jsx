import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconPhone } from './icons.jsx'
import Logo from './Logo.jsx'
import Magnetic from './Magnetic.jsx'
import './Navbar.css'

const LINKS = [
  { href: '#uslugi', label: 'Услуги' },
  { href: '#zashto-nie', label: 'Защо АДРИНА' },
  { href: '#kak-rabotim', label: 'Как работим' },
  { href: '#kontakti', label: 'Контакти' },
]

const PHONE = '0887 803 023'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(Boolean)
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#top" className="navbar__logo">
          <Logo size={36} />
          <span className="navbar__logo-text">
            Адрина <em>ООД</em>
            <small>Пест Контрол</small>
          </span>
        </a>

        <nav className="navbar__links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={activeId === l.href.slice(1) ? 'is-active' : ''}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <a href={`tel:+359${PHONE.replace(/^0/, '').replace(/\s/g, '')}`} className="navbar__phone">
            <IconPhone width={18} height={18} />
            {PHONE}
          </a>
          <Magnetic strength={10}>
            <a href="#kontakti" className="btn btn-primary navbar__cta">Запитване</a>
          </Magnetic>
        </div>

        <button
          className={`navbar__burger ${open ? 'is-open' : ''}`}
          aria-label="Меню"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="navbar__mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            ))}
            <a
              href={`tel:+359${PHONE.replace(/^0/, '').replace(/\s/g, '')}`}
              className="navbar__mobile-phone"
              onClick={() => setOpen(false)}
            >
              <IconPhone width={18} height={18} /> {PHONE}
            </a>
            <a href="#kontakti" className="btn btn-primary" onClick={() => setOpen(false)}>Запитване</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

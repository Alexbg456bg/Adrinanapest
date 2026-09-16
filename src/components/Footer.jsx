import { IconPhone, IconMail } from './icons.jsx'
import Logo from './Logo.jsx'
import { handleHashClick } from '../utils/scroll.js'
import './Footer.css'

const LINKS = [
  { href: '#uslugi', label: 'Услуги' },
  { href: '#zashto-nie', label: 'Защо АДРИНА' },
  { href: '#kak-rabotim', label: 'Как работим' },
  { href: '#vaprosi', label: 'Въпроси' },
  { href: '#kontakti', label: 'Контакти' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer has-cursor-accent">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            <Logo size={32} />
            Адрина ООД
          </span>
          <p>
            ДДД управление за производствени, логистични и корпоративни обекти — от 2003 г.
            Дезинсекция, дератизация, дезинфекция и дезакаризация с протокол след
            всяко третиране.
          </p>
        </div>

        <nav className="footer__links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={handleHashClick(l.href)}>{l.label}</a>
          ))}
        </nav>

        <div className="footer__contact">
          <a href="tel:+359887803023"><IconPhone width={16} height={16} /> 0887 803 023</a>
          <a href="mailto:adrinapest@gmail.com"><IconMail width={16} height={16} /> adrinapest@gmail.com</a>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {year} Адрина ООД. Всички права запазени.</span>
        <span className="footer__license">ЕИК 131046886 · ул. „Цар Самуил“ 109, София</span>
      </div>
    </footer>
  )
}

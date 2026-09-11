import { IconPhone, IconMail } from './icons.jsx'
import Logo from './Logo.jsx'
import './Footer.css'

const LINKS = [
  { href: '#uslugi', label: 'Услуги' },
  { href: '#vreditelite', label: 'Вредители' },
  { href: '#zashto-nie', label: 'Защо ние' },
  { href: '#kak-rabotim', label: 'Как работим' },
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
            Лицензирана ДДД фирма в София от 2005 г. — дезинсекция, дератизация,
            дезинфекция и дезакаризация за дома и бизнеса.
          </p>
        </div>

        <nav className="footer__links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <div className="footer__contact">
          <a href="tel:+359887803023"><IconPhone width={16} height={16} /> 0887 803 023</a>
          <a href="mailto:adrinapest@gmail.com"><IconMail width={16} height={16} /> adrinapest@gmail.com</a>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {year} Адрина ООД. Всички права запазени.</span>
        <span className="footer__license">Лиценз № 2-25 / 01.04.2005 г.</span>
      </div>
    </footer>
  )
}

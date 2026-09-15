import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import './PageLoader.css'

// Кратка встъпителна анимация на логото при първо зареждане.
// Забележка: нарочно НЕ разчита на framer-motion exit-анимация за премахване —
// в затъмнен/неактивен таб requestAnimationFrame може да „замръзне" по средата
// и да остави overlay-а да блокира целия сайт. Тук премахването от DOM става
// на твърд setTimeout, независимо от визуалното състояние на fade-а.
export default function PageLoader() {
  const [fading, setFading] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.body.classList.add('is-loading')
    const fadeTimer = setTimeout(() => setFading(true), 850)
    const removeTimer = setTimeout(() => {
      setVisible(false)
      document.body.classList.remove('is-loading')
      // Докато body имаше overflow:hidden, браузърът не успя да скролне до
      // евентуален #hash от адреса при първото зареждане — довършваме го ръчно.
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash)
        if (target) target.scrollIntoView({ behavior: 'instant' })
      }
    }, 1250)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
      document.body.classList.remove('is-loading')
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`page-loader ${fading ? 'is-fading' : ''}`}>
      <div className="page-loader__mark">
        <Logo size={56} />
        <span>Адрина ООД</span>
      </div>
    </div>
  )
}

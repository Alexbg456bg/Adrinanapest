import { motion } from 'framer-motion'
import './PestBackdrop.css'

// Преизползваем duotone фон от реална снимка на вредител — обезцветена и
// тонирана в брандовите цветове (mix-blend-mode: color), за текстурен,
// тематичен фон вместо плосък градиент. Ако се подаде parallaxY (motion
// value), снимката леко се измества вертикално при скрол за дълбочина.
export default function PestBackdrop({ photo, className = '', parallaxY }) {
  return (
    <div className={`pest-backdrop ${className}`} aria-hidden="true">
      <motion.img src={photo} alt="" style={parallaxY ? { y: parallaxY } : undefined} />
      <span className="pest-backdrop__tint" />
    </div>
  )
}

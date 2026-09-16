import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Обвивка, която добавя лек 3D наклон според позицията на курсора —
// комбинира се с всякакви други motion пропове (variants, whileHover, ...),
// подадени през ...motionProps, тъй като framer-motion смесва transform
// стойностите от style и от анимационните пропове в едно cssTransform.
export default function TiltCard({ children, className = '', maxTilt = 7, style, ...motionProps }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const pressed = useMotionValue(1)
  const springX = useSpring(px, { stiffness: 220, damping: 22, mass: 0.4 })
  const springY = useSpring(py, { stiffness: 220, damping: 22, mass: 0.4 })
  const springScale = useSpring(pressed, { stiffness: 420, damping: 24 })
  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt])
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt])

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const handleLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  // hover не се задейства на тъч устройства — без това картите изглеждат
  // статични при докосване, вместо да реагират като бутон.
  const handlePressStart = () => pressed.set(0.97)
  const handlePressEnd = () => pressed.set(1)

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressEnd}
      style={{ ...style, rotateX, rotateY, scale: springScale, transformPerspective: 800 }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

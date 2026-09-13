import { motion } from 'framer-motion'

// Заглавие, което "изплува от мъгла" — влиза замъглено и избледняло, после
// идва на фокус при скрол. Вдъхновено от text-reveal ефекта в референтния
// редизайн на клиентката (adrina-pest-redesign.akatsarova.chatgpt.site).
export default function BlurReveal({ as = 'h2', children, className = '' }) {
  const MotionTag = motion[as] || motion.h2
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, filter: 'blur(14px)', y: 10 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

import { motion } from 'framer-motion'

// Илюстрация на помпена пръскачка, сглобена от отделни части (резервоар,
// помпа, маркуч, накрайник), които "долитат" на мястото си със stagger, а
// накрая накрайникът пръска капки — вместо статична икона.
const DROPLETS = [
  { angle: -52, dist: 30 },
  { angle: -28, dist: 40 },
  { angle: -8, dist: 32 },
  { angle: 14, dist: 42 },
  { angle: 34, dist: 30 },
]

export default function SprayerAnimation({ size = 108 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      {/* Резервоар */}
      <motion.g
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
      >
        <rect x="54" y="44" width="26" height="40" rx="9" fill="var(--color-primary)" stroke="var(--color-primary-dark)" strokeWidth="2" />
        <rect x="59" y="51" width="6" height="26" rx="3" fill="rgba(255,255,255,0.16)" />
      </motion.g>

      {/* Помпа отгоре */}
      <motion.g
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.3 }}
      >
        <rect x="64" y="28" width="6" height="18" rx="3" fill="var(--color-primary-dark)" />
        <rect x="57" y="23" width="20" height="7" rx="3.5" fill="var(--color-primary-dark)" />
      </motion.g>

      {/* Тяло/дръжка + спусък */}
      <motion.g
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.48 }}
      >
        <path d="M80 58c9 1 15 6 17 13" stroke="var(--color-primary-dark)" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M92 71c4 3 5 8 3 13" stroke="var(--color-primary-dark)" strokeWidth="4" strokeLinecap="round" fill="none" />
      </motion.g>

      {/* Маркуч към накрайника (изчертава се) */}
      <motion.path
        d="M56 76c-11 2-20 9-27 23"
        stroke="var(--color-primary-dark)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.6 }}
      />

      {/* Накрайник */}
      <motion.g
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'backOut', delay: 0.95 }}
        style={{ transformOrigin: '24px 100px' }}
      >
        <path d="M18 96 L30 100 L18 104Z" fill="var(--color-accent)" />
      </motion.g>

      {/* Пръски от накрайника */}
      {DROPLETS.map(({ angle, dist }, i) => {
        const rad = (angle * Math.PI) / 180
        return (
          <motion.circle
            key={i}
            cx={14}
            cy={100}
            r={2.6}
            fill="var(--color-mint)"
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 1, 0],
              x: -Math.cos(rad) * dist,
              y: Math.sin(rad) * dist,
              scale: [0.4, 1, 0.6],
            }}
            transition={{
              duration: 0.7,
              delay: 1.15 + i * 0.07,
              ease: 'easeOut',
              repeat: 1,
              repeatDelay: 0.25,
            }}
          />
        )
      })}
    </svg>
  )
}

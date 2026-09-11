// Марка на "Адрина ООД" — щит (защита) с отметка (обеззаразен/сигурен обект).
// Няма готово фирмено лого от клиента — това е временен, лесен за подмяна знак.
export default function Logo({ size = 38 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#1c3d4d" />
          <stop offset="100%" stopColor="#061c29" />
        </linearGradient>
      </defs>
      <path
        d="M20 3.2 33 8v9.6c0 9-6 15.2-13 18.6C13 32.8 7 26.6 7 17.6V8l13-4.8Z"
        fill="url(#logoGrad)"
      />
      <path
        d="M13.3 19.6c1.8 2 3.6 3.9 3.6 3.9s4.7-6 8.6-9.8"
        fill="none"
        stroke="#3dbfa8"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Едва забележим декоративен шестоъгълник, повтарящ формата от логото —
// дискретна визуална връзка между марката и фона, само на desktop. Бавно се
// върти (90s/оборот) — почти невидимо кадър по кадър, но дава "жив" фон
// вместо статична декорация, ако човек погледне секцията по-дълго.
export default function BrandMotif({ className = '' }) {
  return (
    <svg className={`brand-motif ${className}`} viewBox="0 0 300 300" aria-hidden="true">
      <path d="M0-132 114-66v132L0 132-114 66V-66Z" transform="translate(150 150)" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

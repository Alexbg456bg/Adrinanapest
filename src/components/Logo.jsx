// Официален знак на "Адрина ООД" — шестоъгълен знак с геометрична буква А,
// предоставен от клиента (същия знак, използван в неговия референтен сайт).
export default function Logo({ size = 38 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 300 300" aria-hidden="true">
      <g transform="translate(150 150) scale(.9)">
        <path d="M0-132 114-66v132L0 132-114 66V-66Z" fill="#071c2c" />
        <path d="M0-132 114-66 0 0-114-66Z" fill="#687542" />
        <path
          d="M-82 95 0-98 82 95M-48 32h96"
          fill="none"
          stroke="#fff"
          strokeWidth="30"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M0-132 114-66v132L0 132-114 66V-66Z"
          fill="none"
          stroke="#fff"
          strokeWidth="10"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

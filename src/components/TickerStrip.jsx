import './TickerStrip.css'

// Безкраен хоризонтален "ticker" — вдъхновен от референтния редизайн на
// клиентката, където етапите на работния процес се превъртат в цикъл.
export default function TickerStrip({ items }) {
  const doubled = [...items, ...items]
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {doubled.map((item, i) => (
          <span className="ticker__item" key={i}>
            {item}
            <span className="ticker__dot" />
          </span>
        ))}
      </div>
    </div>
  )
}

import './TickerStrip.css'

// Безкраен хоризонтален "ticker" — вдъхновен от референтния редизайн на
// клиентката. Наименованията се редуват бяло/зелено; при нечетен брой те се
// удвояват, за да е четен "наборът" и цветовете да не се слепват при
// повторението (иначе две бели се срещат на шева на цикъла).
const SECONDS_PER_ITEM = 6.9

export default function TickerStrip({ items }) {
  const base = items.length % 2 === 1 ? [...items, ...items] : items
  const doubled = [...base, ...base]
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track" style={{ '--ticker-duration': `${(base.length * SECONDS_PER_ITEM).toFixed(1)}s` }}>
        {doubled.map((item, i) => (
          <span className={`ticker__item ${i % 2 === 1 ? 'ticker__item--green' : ''}`} key={i}>
            {item}
            <span className="ticker__dot" />
          </span>
        ))}
      </div>
    </div>
  )
}

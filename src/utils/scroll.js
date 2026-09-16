function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// Ръчна rAF-анимация вместо `scrollTo({behavior:'smooth'})` — в някои
// обвивки/webview-и (а и при CSS `scroll-behavior:smooth` на html) вграденото
// "smooth" тихо не прави нищо, докато честите `scrollTo(..., {behavior:
// 'instant'})` по кадър винаги реално местят страницата, само че самите ние
// вече контролираме плавността.
function animatedScrollTo(targetY, duration = 550) {
  const startY = window.scrollY
  const diff = targetY - startY
  if (Math.abs(diff) < 1) return
  const startTime = performance.now()

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1)
    window.scrollTo({ top: startY + diff * easeInOutCubic(progress), behavior: 'instant' })
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

// Единна логика за скрол до секция по #hash — не разчитаме само на
// браузърната стандартна навигация по anchor линк, защото (1) фиксираният
// navbar покрива горната част на целта, ако не извадим височината му, и
// (2) в някои обвивки/webview-и native scroll-to-#hash изобщо не се
// задейства при клик (hash-ът в адреса се сменя, но страницата не se
// премества) — затова скролваме изрично с JS при всеки клик на вътрешен линк.
export function scrollToHash(hash) {
  const id = hash.replace('#', '')
  const target = document.getElementById(id)
  if (!target) return
  // .navbar__inner (не целия .navbar) — когато мобилното меню е отворено,
  // .navbar включва и разгънатия списък, което би завишило офсета неправилно.
  const navbarInner = document.querySelector('.navbar__inner')
  const offset = (navbarInner?.offsetHeight || 0) + 32
  const top = target.getBoundingClientRect().top + window.scrollY - offset
  animatedScrollTo(Math.max(top, 0))
  if (window.history?.pushState) window.history.pushState(null, '', hash)
}

export function handleHashClick(hash) {
  return (e) => {
    e.preventDefault()
    scrollToHash(hash)
  }
}

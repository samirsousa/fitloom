// Registra o service worker só no build de produção. No `npm run dev` ele ficaria
// servindo arquivos antigos do cache e atrapalharia o desenvolvimento.
export function registerServiceWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return
  window.addEventListener('load', () => {
    const base = import.meta.env.BASE_URL
    navigator.serviceWorker.register(`${base}sw.js`, { scope: base }).catch(() => {
      // Sem service worker o app continua funcionando, só não abre offline
    })
  })
}

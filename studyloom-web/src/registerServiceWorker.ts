// Registra o service worker só no build de produção. No `npm run dev` ele ficaria
// servindo arquivos antigos do cache e atrapalharia o desenvolvimento.
export function registerServiceWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {
      // Sem service worker o app continua funcionando, só não abre offline
    })
  })
}

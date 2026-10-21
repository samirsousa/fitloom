// Service worker do Studyloom, sem dependências.
// Regras de segurança:
// - só guarda respostas GET do próprio site (nada de outros domínios, nada opaco);
// - só guarda respostas com status 200;
// - não usa importScripts nem executa código vindo do cache;
// - páginas sempre tentam a rede primeiro, então uma versão nova chega assim que houver internet.

const CACHE = 'studyloom-v1'
const MAX_ENTRIES = 80

// Pasta onde o app está publicado: "/" localmente, "/fitloom/" no GitHub Pages
const BASE = new URL('./', self.location).pathname

// O mínimo para abrir sem internet: a página, o manifest, os ícones e as imagens da Lumi
const SHELL = [
  '',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/favicon-48.png',
  'assets/lumi-hero.webp',
  'assets/lumi-coach.webp',
  'assets/lumi-celebrate.webp',
  'assets/lumi-auditor.webp',
  'assets/lumi-dino.webp',
  'assets/lumi-judge.webp',
  'assets/lumi-hero-glasses.webp',
  'assets/lumi-hero-headphones.webp',
  'assets/lumi-hero-both.webp',
].map((path) => BASE + path)

// Arquivos gerados pelo build têm hash no nome e nunca mudam de conteúdo
const HASHED = /\/assets\/[^/]+-[A-Za-z0-9_-]{8}\.(js|css)$/

function cacheable(response) {
  return response && response.status === 200 && response.type === 'basic'
}

async function put(request, response) {
  const cache = await caches.open(CACHE)
  await cache.put(request, response)
  const keys = await cache.keys()
  // Descarta os mais antigos para o cache não crescer a cada atualização do app
  for (const key of keys.slice(0, Math.max(0, keys.length - MAX_ENTRIES))) {
    if (!SHELL.includes(new URL(key.url).pathname)) await cache.delete(key)
  }
}

// Guarda também o JS e o CSS principais citados na página, para o app abrir offline
async function cacheEntryAssets(cache) {
  const response = await fetch(BASE, { cache: 'no-store' })
  if (!cacheable(response)) return
  await cache.put(BASE, response.clone())
  const html = await response.text()
  const assets = [...html.matchAll(/(?:src|href)="([^"]*\/assets\/[^"]+\.(?:js|css))"/g)]
    .map((m) => new URL(m[1], self.location).pathname)
    .filter((path) => path.startsWith(BASE))
  await cache.addAll(assets)
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then(async (cache) => {
      await cache.addAll(SHELL)
      await cacheEntryAssets(cache)
      await self.skipWaiting()
    }),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return

  // Navegação (SPA): rede primeiro; sem internet, a página guardada
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (cacheable(response)) put(BASE, response.clone())
          return response
        })
        .catch(() => caches.match(BASE)),
    )
    return
  }

  // Arquivos com hash: cache primeiro, porque nunca mudam
  if (HASHED.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ??
          fetch(request).then((response) => {
            if (cacheable(response)) put(request, response.clone())
            return response
          }),
      ),
    )
    return
  }

  // Demais arquivos do site (imagens, ícones, manifest): responde do cache e atualiza em segundo plano
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (cacheable(response)) put(request, response.clone())
          return response
        })
        .catch(() => cached)
      return cached ?? network
    }),
  )
})

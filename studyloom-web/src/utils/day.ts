// Datas no formato AAAA-MM-DD, no fuso local do aparelho
export function localDay(date = new Date()) {
  return date.toLocaleDateString('sv-SE')
}

export function yesterday() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return localDay(d)
}

// Dias de calendário entre duas datas AAAA-MM-DD (hoje e ontem dão 1)
export function daysBetween(from: string, to: string) {
  const [fy, fm, fd] = from.split('-').map(Number)
  const [ty, tm, td] = to.split('-').map(Number)
  return Math.round((Date.UTC(ty, tm - 1, td) - Date.UTC(fy, fm - 1, fd)) / 86_400_000)
}

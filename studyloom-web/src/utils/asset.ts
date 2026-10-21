// Monta o caminho de um arquivo de public/ respeitando o base do Vite
// ("/" no ambiente local, "/fitloom/" no GitHub Pages)
export function asset(path: string) {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}

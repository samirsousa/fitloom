import type { PersistOptions, PersistStorage, StorageValue } from 'zustand/middleware'

// Único ponto de acesso ao armazenamento local. Na Fase 1 a troca pela API acontece aqui
// e nas ações dos stores, sem mexer nas telas.
export const STORAGE_KEY = 'studyloom-state-v1'
// Suba a versão quando o formato dos dados mudar e trate a conversão em migrate
export const STORAGE_VERSION = 1

type StorePart = 'game' | 'lumi'

// Lê a chave inteira. Aba anônima, armazenamento bloqueado ou JSON inválido viram objeto vazio.
function readAll(): Record<string, unknown> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {}
  } catch {
    return {}
  }
}

function writeAll(all: Record<string, unknown>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  } catch {
    // Sem espaço ou sem permissão: o app segue funcionando só em memória
  }
}

function partStorage<T>(): PersistStorage<T> {
  return {
    getItem: (name) => (readAll()[name] as StorageValue<T> | undefined) ?? null,
    setItem: (name, value) => writeAll({ ...readAll(), [name]: value }),
    removeItem: (name) => {
      const all = readAll()
      delete all[name]
      writeAll(all)
    },
  }
}

// Guarda só os dados do store, nunca as funções
function dataOnly<S extends object>(state: S) {
  return Object.fromEntries(
    Object.entries(state).filter(([, value]) => typeof value !== 'function'),
  ) as Partial<S>
}

export function persistOptions<S extends object>(part: StorePart): PersistOptions<S, Partial<S>> {
  return {
    name: part,
    version: STORAGE_VERSION,
    storage: partStorage<Partial<S>>(),
    partialize: dataOnly,
    // Versão desconhecida: descarta e começa limpo, sem quebrar o app
    migrate: (persisted, version) =>
      (version === STORAGE_VERSION ? persisted : {}) as Partial<S>,
  }
}

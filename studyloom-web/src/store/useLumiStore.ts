import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  ACCESSORY_POSE,
  accessoryOptions,
  basePoses,
  epicCostumes,
  furOptions,
  type AccessoryKey,
  type BasePoseKey,
  type EpicId,
  type FurKey,
} from '../data/wardrobe'
import { persistOptions } from './persistence'

interface LumiData {
  furKey: FurKey
  accessoryKey: AccessoryKey
  basePoseKey: BasePoseKey
  activeEpicId: EpicId | null
  // Fantasias pagas com XP que já foram compradas
  ownedEpics: EpicId[]
}

interface LumiState extends LumiData {
  setFur: (key: FurKey) => void
  setAccessory: (key: AccessoryKey) => void
  equipBasePose: (key: BasePoseKey) => void
  equipEpic: (id: EpicId) => void
  markEpicOwned: (id: EpicId) => void
  reset: () => void
}

const initialLumiData: LumiData = {
  furKey: 'classic',
  accessoryKey: 'none',
  basePoseKey: 'hero',
  activeEpicId: null,
  ownedEpics: [],
}

// Guarda só as escolhas. Imagem e textos são derivados em useLumiLook.
export const useLumiStore = create<LumiState>()(
  persist(
    (set) => ({
      ...initialLumiData,

      setFur: (key) => set({ furKey: key }),
      // Acessório equipa a pose Padrão e tira a épica, porque só existe imagem nessa combinação
      setAccessory: (key) =>
        set(
          key === 'none'
            ? { accessoryKey: key }
            : { accessoryKey: key, basePoseKey: ACCESSORY_POSE, activeEpicId: null },
        ),
      // Outra pose base não tem imagem com acessório, então o acessório volta para "nenhum"
      equipBasePose: (key) =>
        set((s) => ({
          basePoseKey: key,
          activeEpicId: null,
          accessoryKey: key === ACCESSORY_POSE ? s.accessoryKey : 'none',
        })),
      equipEpic: (id) => set({ activeEpicId: id }),
      markEpicOwned: (id) =>
        set((s) => (s.ownedEpics.includes(id) ? s : { ownedEpics: [...s.ownedEpics, id] })),
      reset: () => set(initialLumiData),
    }),
    persistOptions<LumiState>('lumi'),
  ),
)

export function useLumiLook() {
  const furKey = useLumiStore((s) => s.furKey)
  const accessoryKey = useLumiStore((s) => s.accessoryKey)
  const basePoseKey = useLumiStore((s) => s.basePoseKey)
  const activeEpicId = useLumiStore((s) => s.activeEpicId)

  const base = basePoses.find((p) => p.key === basePoseKey) ?? basePoses[0]
  const epic = epicCostumes.find((c) => c.id === activeEpicId)
  const accessory = accessoryOptions.find((a) => a.key === accessoryKey)
  // Prioridade: fantasia épica, depois acessório (só na pose Padrão), depois a pose base
  const accessoryLook = base.key === ACCESSORY_POSE ? accessory?.look : undefined
  const skin = epic ?? accessoryLook ?? base

  return {
    imgPath: skin.imgPath,
    skinTag: skin.skinTag,
    skinTitle: skin.skinTitle,
    furClass: `fur-${furKey}`,
    furLabel: furOptions.find((f) => f.key === furKey)?.label ?? '',
    accessoryLabel: accessory?.label ?? '',
  }
}

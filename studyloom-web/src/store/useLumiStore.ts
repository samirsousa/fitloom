import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
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
      setAccessory: (key) => set({ accessoryKey: key }),
      equipBasePose: (key) => set({ basePoseKey: key, activeEpicId: null }),
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
  const skin = epic ?? base

  return {
    imgPath: skin.imgPath,
    skinTag: skin.skinTag,
    skinTitle: skin.skinTitle,
    furClass: `fur-${furKey}`,
    furLabel: furOptions.find((f) => f.key === furKey)?.label ?? '',
    accessoryLabel: accessoryOptions.find((a) => a.key === accessoryKey)?.label ?? '',
    showGlasses: accessoryKey === 'glasses' || accessoryKey === 'both',
    showHeadphones: accessoryKey === 'headphones' || accessoryKey === 'both',
  }
}

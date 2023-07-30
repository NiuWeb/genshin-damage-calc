import { genshin } from "@src/genshin/core"
import { createDefaultColormap } from "@src/utils/colormap"
import { createContext, useContext, useMemo } from "react"

const criteria = ["damage", "cost", "efficiency"] as const
export interface UpgradesRowContext {
  row: genshin.optimizer.upgrades.Result[]
  max: genshin.optimizer.upgrades.CriteriaValues
  min: genshin.optimizer.upgrades.CriteriaValues
  colormap: {
    [criteria in genshin.optimizer.upgrades.Criteria]: {
      max: (value: number) => string
      min: (value: number) => string
    }
  }

}

export const UpgradesRowContext = createContext({} as UpgradesRowContext)
export const useUpgradesRowContext = () => useContext(UpgradesRowContext)

export function UpgradesRowProvider({ row, children }: {
  row: genshin.optimizer.upgrades.Result[]
  children: React.ReactNode
}) {

  const context = useMemo(() => {
    const max: genshin.optimizer.upgrades.CriteriaValues = {
      damage: 0,
      cost: 0,
      efficiency: 0,
    }
    const min = { ...max }
    const colormap = {} as UpgradesRowContext["colormap"]

    criteria.forEach(c => {
      max[c] = Math.max(...row.map(item => item[c]))
      min[c] = Math.min(...row.map(item => item[c]))

      const fn = createDefaultColormap(min[c], max[c])
      colormap[c] = {
        max: fn,
        min: (value) => fn(max[c] - value + min[c])
      }
    })


    return { max, min, colormap }
  }, [row])

  return <UpgradesRowContext.Provider value={{ row, ...context }}>
    {children}
  </UpgradesRowContext.Provider>
}
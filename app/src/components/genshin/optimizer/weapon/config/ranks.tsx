import { Checkbox } from "@src/components/checkbox/checkbox"
import { genshin } from "@src/genshin/core"
import { useReducer } from "react"
import { StarFill } from "react-bootstrap-icons"

export function WeaponRanks({ config, onChange }: {
  config: genshin.optimizer.weapon.BaseConfig["Ranks"]
  onChange?(config: genshin.optimizer.weapon.BaseConfig["Ranks"]): void
}) {
  const [, update] = useReducer(x => (x + 1) % 6, 0)
  function change(stars: number, ranks: readonly number[]) {
    if (!config) {
      config = {}
    }
    config[stars] = [...ranks]
    update()
    onChange?.(config)
  }

  return <div className="weapon-ranks flex flex-col gap-1">
    {[3, 4, 5].map(stars => (
      <Ranks
        key={stars}
        stars={stars}
        ranks={config?.[stars] || []}
        onChange={ranks => change(stars, ranks)} />
    ))}
  </div>
}

export function Ranks({ stars, ranks, onChange }: {
  stars: number
  ranks: readonly number[]
  onChange(ranks: readonly number[]): void
}) {
  function change(checked: boolean, rank: number) {
    ranks = ranks.filter(r => r !== rank)
    if (checked) {
      ranks = [...ranks, rank]
    }
    onChange(ranks)
  }
  return <div className="rank-row flex gap-1 items-center">
    {stars}
    <StarFill />
    {[1, 2, 3, 4, 5].map(rank => (
      <div key={rank} className="flex items-center gap-0.5">
        <Checkbox
          onChange={c => change(c, rank)}
          checked={ranks.includes(rank)} />
        R{rank}
      </div>
    ))}
  </div>
}
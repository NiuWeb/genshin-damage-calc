import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { Tooltip } from "@src/components/tooltip/tooltip"
import { genshin } from "@src/genshin/core"
import { printStat } from "@src/genshin/utils/stat"
import { Alert } from "@src/popup/alert"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { useReducer } from "react"
import { ExclamationCircle, XCircle } from "react-bootstrap-icons"

export function FoodCardItem({ food, onRemove }: { food: genshin.food.Food, onRemove(): void }) {
  const [, update] = useReducer(x => (x + 1) % 3, 0)
  const rid = Math.random().toString(36)

  function details() {
    Alert({
      title: GetString("LABEL.DETAILS_MORE"),
      content: <Details food={food} />,
    })
  }

  function changeRank(rank: number) {
    food.SetRank(rank)
    update()
  }

  return <div className="food border border-neutral-900 bg-slate-700 ">
    <div className="food-name bg-gray-800 p-1 flex justify-between">
      <div className="left flex gap-1 items-center">
        <button data-tooltip={rid + "-details"} onClick={details}>
          <ExclamationCircle />
        </button>
        <Tooltip id={rid + "-details"}>
          {GetString("LABEL.DETAILS_MORE")}
        </Tooltip>
        {food.Name}
      </div>
      <div className="right flex gap-1 justify-center">
        <Rank food={food} onChange={changeRank} />
        <button
          onClick={onRemove}
          data-tooltip={rid + "-remove"}
          className="p-1 bg-red-500 hover:bg-red-600 active:bg-red-700">
          <XCircle />
        </button>
      </div>
      <Tooltip id={rid + "-remove"}>{GetString("ACTION.REMOVE")}</Tooltip>
    </div>
    <FoodBody food={food.Options} rank={food.GetRank()} />
  </div>
}

export function FoodBody({ food, rank }: { food: genshin.food.Options, rank?: number }) {
  return <div className="p-1 flex gap-1">
    <Type type={food.Type} />
    {food.Effects.map((mod, i) => (
      <ModTag key={i} mod={mod} rank={rank} />
    ))}
  </div>
}

function Rank({ food, onChange }: { food: genshin.food.Food, onChange?(rank: number): void }) {
  const rank = food.GetRank()

  function change([rank]: number[]) {
    onChange?.(rank || 1)
  }

  return <Dropdown
    className="bg-slate-700"
    onChange={change}
    values={[rank]}
    title={GetString("FOOD_RANK_" + rank)}>
    {[1, 2, 3].map(r => (
      <DropdownItem key={r} value={r}>
        {GetString("FOOD_RANK_" + r)}
      </DropdownItem>
    ))}

  </Dropdown>
}

function ModTag({ mod, rank }: { mod: genshin.food.FoodMod, rank?: number }) {
  const [stat, min, max] = mod
  const value = min + (max - min) * ((rank || 1) - 1) / 2

  return <div className="mod-tag bg-gray-800 p-1">
    {GetString("STAT." + genshin.stats.stat.Name(stat))} +{printStat(stat, value)}
  </div>
}

function Details({ food }: { food: genshin.food.Food }) {
  const targets = food.Effect.GetTargets()
  return <pre className="bg-neutral-900 p-1">
    APPLIES TO:
    {targets.map((target, i) => (
      <div key={i}>
        {target.GetCharacter().Options.Name}
      </div>
    ))}
  </pre>
}

function Type({ type }: { type: genshin.food.FoodType }) {
  return <div className={classes(
    "p-1 text-black",
    types[type]
  )}>
    {GetString("FOOD_TYPE_" + type)}
  </div>
}

const types = {
  [genshin.food.FoodType.OFFENSIVE]: "bg-red-400",
  [genshin.food.FoodType.DEFENSIVE]: "bg-blue-400",
  [genshin.food.FoodType.ELEMENTAL]: "bg-green-400",
  [genshin.food.FoodType.STAMINA]: "bg-yellow-400",
}
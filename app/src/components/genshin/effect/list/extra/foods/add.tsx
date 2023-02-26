import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItemEmpty } from "@src/components/dropdown/item-empty"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { FoodBody } from "./food"

const foods = genshin.foods.GetList()

export function FoodAddButton({ onAdd }: { onAdd?: (food: genshin.food.Generator) => void }) {

  function change([index]: number[]) {
    const food = foods[index]
    if (!food) { return }
    onAdd?.(food)
  }

  return <Dropdown
    onChange={change}
    title={GetString("ACTION.ADD")}
    className="w-full p-1 bg-blue-500 text-black hover:bg-blue-600 active:bg-blue-700">

    {foods.map((food, i) => (
      <DropdownItemEmpty key={i} value={i}>
        <div className="p-1 bg-slate-700 hover:bg-slate-700/80 hover:cursor-pointer">
          {food.Name}
          <FoodBody food={food} />
        </div>
      </DropdownItemEmpty>
    ))}

  </Dropdown>
}
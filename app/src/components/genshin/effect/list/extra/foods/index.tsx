import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useReducer } from "react"
import { FoodCardItem } from "./food"
import { FoodAddButton } from "./add"

export function FoodCard({ charbox }: { charbox: genshin.charbox.Charbox }) {

  const [, update] = useReducer(x => (x + 1) % 3, 0)

  const foods = charbox.GetParty()?.GetFoods()
  if (!foods) { return <>{GetString("LABEL.EFFECT_NONE")}</> }

  const list = foods.GetAll()

  const remove = (name: string) => {
    foods.Remove(name)
    update()
  }

  const add = (food: genshin.food.Generator) => {
    foods.Add(food)
    update()
  }

  return <div className="foods">
    <div className="food-list flex flex-col gap-1">
      <FoodAddButton onAdd={add} />
      {list.map((food, i) => (
        <FoodCardItem
          key={i}
          food={food}
          onRemove={() => remove(food.Name)} />
      ))}
    </div>
  </div>
}
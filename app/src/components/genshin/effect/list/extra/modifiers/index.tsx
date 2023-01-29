import { usePagination } from "@src/components/pagination/hook"
import { Pagination } from "@src/components/pagination/pagination"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useReducer } from "react"
import { ModifierCard } from "./mod"

export function ModifiersCard({ charbox }: { charbox: genshin.charbox.Charbox }) {
  const mods = charbox.GetModifiers()
  const pagination = usePagination(mods, 5)

  const [, update] = useReducer(x => (x + 1) % 6, 0)

  function remove(mod: genshin.subject.Modifier) {
    charbox.RemoveModifier(mod)
    pagination.Update()
    update()
  }
  function add() {
    charbox.AddModifier(charbox.GetCharacter().CreateModifier(genshin.stats.stat.ATK_FLAT, 0))
    pagination.Update()
    update()
  }
  return <div className="modifiers flex flex-col gap-1">
    <button
      onClick={add}
      className="p-1 bg-blue-500 text-black hover:bg-blue-600 active:bg-blue-700">
      {GetString("ACTION.ADD")}
    </button>
    {pagination.Get().map((mod, i) => (
      <ModifierCard
        key={i}
        mod={mod}
        onRemove={() => remove(mod)} />
    ))}
    {pagination.pages > 1 && (
      <div className="flex justify-center">
        <Pagination model={pagination} />
      </div>
    )}
  </div>
}
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { useMemo } from "react"
import { ElementIcon } from "../../auras/icon"

export function CharacterUnloaded({ name, onClick }: {
  name: string
  onClick?(char: genshin.charbox.Generator): void
}) {
  const character = useMemo(() => genshin.characters.FindByName(name), [name])
  if (!character) { return null }

  function click() {
    if (!character) { return }
    onClick?.(character)
  }

  return <div onClick={click} role="button" className={classes(
    "character-unloaded p-2 flex items-center gap-2",
    "bg-slate-600 border border-slate-900",
    "hover:bg-slate-700 hover:cursor-pointer"
  )}>
    <div>
      <ElementIcon element={character.Element} />
    </div>
    <div className="character-name text-xl grow">
      {GetString("ITEM." + character.Name)}
    </div>
    <div>
      {GetString("ITEM." + genshin.stats.weapon.Name(character.Weapon))}
    </div>
  </div>
}
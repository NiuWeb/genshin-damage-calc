import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { ElementIcon } from "../../auras/icon"

export function CharacterLoaded({ charbox, onClick }: {
  charbox: genshin.charbox.Charbox
  onClick?(char: genshin.charbox.Charbox): void
}) {
  const character = charbox.GetCharacter()

  function click() {
    onClick?.(charbox)
  }

  return <div onClick={click} role="button" className={classes(
    "character-unloaded p-2 flex items-center gap-2",
    "bg-slate-600 border border-slate-900",
    "hover:bg-slate-700 hover:cursor-pointer"
  )}>
    <div>
      <ElementIcon element={character.Options.Element} />
    </div>
    <div className="character-name text-xl grow">
      {GetString("ITEM." + character.Options.Name)}
    </div>
    <div>
      {GetString("STAT.LEVEL")} {character.GetLevel()}
    </div>
  </div>
}
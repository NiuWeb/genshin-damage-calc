import { Checkbox } from "@src/components/checkbox/checkbox"
import { genshin } from "@src/genshin/core"
import { CharacterLoaded } from "./litem-loaded"

export function AddMultipleLoaded({ list, selected, onChange }: {
  list: genshin.charbox.Charbox[]
  selected: genshin.charbox.Charbox[]
  onChange?(selected: genshin.charbox.Charbox[]): void
}) {

  function toggle(char: genshin.charbox.Charbox) {
    if (selected.includes(char)) {
      onChange?.(selected.filter(s => s !== char))
    } else {
      onChange?.([...selected, char])
    }
  }

  return <div className="flex flex-col gap-1">
    {list.map((char, i) => (
      <div className="flex gap-1" key={i}>
        <div className="grow">
          <CharacterLoaded
            charbox={char}
            onClick={toggle} />
        </div>
        <div className="flex items-center">
          <Checkbox
            onChange={() => toggle(char)}
            checked={selected.includes(char)} />
        </div>
      </div>
    ))}
  </div>
}
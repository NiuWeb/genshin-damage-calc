import { NumberField } from "@src/components/number-field/number-field"
import { Tooltip } from "@src/components/tooltip/tooltip"
import { useCalc } from "@src/genshin/context"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { Plus, Dash } from "react-bootstrap-icons"

export function LevelInput({ character }: { character: genshin.character.Character }) {
  const [, exec] = useCalc()

  function changeLevel(level: number) {
    exec(() => character.SetLevel(level))
  }

  function toggleAscended() {
    exec(() => character.SetAscension(character.IsAscended() ? 0 : 6))
  }

  return <div className="inline-flex items-stretch">
    <NumberField
      className=" w-[32px] text-right bg-slate-600"
      places={0}
      onChange={changeLevel}
      value={character.GetLevel()} />
    <button
      onClick={toggleAscended}
      data-tooltip={"character-ascended-button-" + character.Options.Name}
      className=" bg-gray-600 hover:bg-gray-700 active:bg-gray-800">
      {character.IsAscended() ? (
        <Plus />
      ) : (
        <Dash />
      )}
    </button>
    <Tooltip id={"character-ascended-button-" + character.Options.Name}>
      {GetString(character.IsAscended() ? "LABEL.ASCENDED" : "LABEL.ASCENDED_NOT")}
    </Tooltip>
  </div>
}
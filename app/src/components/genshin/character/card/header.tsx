import { Tooltip } from "@src/components/tooltip/tooltip"
import { ElementBgColor } from "@src/genshin/utils/colors"
import { useCalc } from "@src/genshin/context"
import { Confirm } from "@src/popup/confirm"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { XCircle } from "react-bootstrap-icons"

export function CharacterHeader({ name, element }: { name: string, element: number }) {
  const [, exec] = useCalc()
  async function remove() {
    const confirm = await Confirm({
      content: GetString("MSG.CONFIRM_CHARACTER_REMOVE", {
        vars: { name: GetString("ITEM." + name) }
      })
    })
    if (!confirm) {
      return
    }
    exec(calc => {
      calc.Run("character remove " + name)
      calc.Get().Scenario.Character = calc.Get().Scenario.Party.GetMembers()[0]
    })
  }
  const tooltipId = name + "-character-remove-button"
  return <div className={classes("character-header flex p-2 text-xl font-bold", ElementBgColor(element))}>
    <div className="mr-auto">{GetString("ITEM." + name)}</div>
    <button
      data-tooltip={tooltipId}
      onClick={remove}
      className="p-1 hover:bg-black/20">
      <XCircle />
    </button>
    <Tooltip id={tooltipId}>
      {GetString("ACTION.CHARACTER_REMOVE")}
    </Tooltip>
  </div>
}
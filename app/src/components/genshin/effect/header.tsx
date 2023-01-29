import { Checkbox } from "@src/components/checkbox/checkbox"
import { Tooltip } from "@src/components/tooltip/tooltip"
import { Alert } from "@src/popup/alert"
import { GetString } from "@src/strings/strings"
import { useContext, useMemo } from "react"
import { QuestionCircle } from "react-bootstrap-icons"
import { EffectContext } from "./context"
import { EffectDetails } from "./details"

export function EffectHeader() {
  const { effect, update } = useContext(EffectContext)

  const labelName = useMemo(() => parseName(effect.Options.Name), [effect.Options.Name])

  function change(enabled: boolean) {
    if (enabled) {
      effect.Enable()
    } else {
      effect.Disable()
    }
    update()
  }
  function details() {
    Alert({
      title: GetString("LABEL.DETAILS_MORE"),
      content: <EffectDetails effect={effect} />
    })
  }
  const tooltipId = "effect-" + effect.Options.Name
  return <div className="effect-header bg-gray-800 flex justify-between p-1 items-center">
    <div className="effect-name" data-tooltip={tooltipId + "-name"}>
      {labelName}
    </div>
    <div className="effect-enabled flex items-center gap-1">
      <Checkbox
        tooltip={tooltipId + "-enable"}
        checked={effect.Enabled()}
        onChange={change} />

      <button onClick={details} data-tooltip={tooltipId + "-details"}>
        <QuestionCircle />
      </button>

    </div>
    <Tooltip id={tooltipId + "-details"}>
      {GetString("LABEL.DETAILS_MORE")}
    </Tooltip>
    <Tooltip id={tooltipId + "-enable"}>
      {GetString("LABEL." + (effect.Enabled() ? "ENABLED" : "DISABLED"))}
    </Tooltip>
    <Tooltip id={tooltipId + "-name"}>
      {effect.Options.Name}
    </Tooltip>
  </div>
}

function parseName(name: string): string {
  const talentMatch = name.match(/((?:C|A)\d+)$/)
  if (talentMatch) {
    return GetString("LABEL.EFFECT_NAME_TEMPLATE", {
      vars: {
        prefix: talentMatch[1],
        name: GetString("ITEM." + name)
      }
    })
  }
  return GetString("ITEM." + name)
}
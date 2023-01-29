import { OptimizerButton } from "@src/components/genshin/optimizer/button"
import { WeaponConfig } from "@src/components/genshin/optimizer/weapon/config"
import { WeaponResult } from "@src/components/genshin/optimizer/weapon/result"
import { useCalc } from "@src/genshin/context"
import { RunOptimizer } from "@src/genshin/run/optimizer"
import { Alert } from "@src/popup/alert"
import { Confirm } from "@src/popup/confirm"
import { GetString } from "@src/strings/strings"
import { PrettyMs } from "@src/utils/pretty-ms"

export function Config() {
  const [calc, exec] = useCalc()

  function show() {
    if (!calc.Results.Weapon) { return }
    Alert({
      full: true,
      title: GetString("LABEL.RESULTS"),
      content: <WeaponResult results={calc.Results.Weapon} />
    })
  }
  async function clear() {
    const confirm = await Confirm({ content: GetString("MSG.CONFIRM_RESULTS_CLEAR") })
    if (!confirm) return
    exec(calc => calc.Results.Weapon = undefined)
  }
  async function optimize() {
    const { time, result, error } = await RunOptimizer("WeaponOptimizer", {
      Target: calc.Get().Scenario.Character?.GetCharacter().Options.Name,
      ...calc.Config.Weapon,
    }, { chunk: 10 })

    exec(calc => {
      calc.Log("[WORKER] Weapons optimizer:", GetString("LABEL.PROCESS_ENDED_TIME_X", {
        vars: {
          time: PrettyMs(time)
        }
      }))
      calc.Results.Weapon = result
      if (!error) {
        show()
      }
    })
  }

  return <div className="flex flex-col gap-1">
    <OptimizerButton
      onRun={optimize}
      onShow={show}
      onClear={clear}
      show={!!calc.Results.Weapon} />
    <WeaponConfig config={calc.Config.Weapon} />
  </div>
}
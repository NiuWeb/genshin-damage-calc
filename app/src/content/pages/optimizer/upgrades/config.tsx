import { OptimizerButton } from "@src/components/genshin/optimizer/button"
import { useCalc } from "@src/genshin/context"
import { GetString } from "@src/strings/strings"
import { PrettyMs } from "@src/utils/pretty-ms"
import { Confirm } from "@src/popup/confirm"
import { UpgradesConfig } from "@src/components/genshin/optimizer/upgrades/config"
import { UpgradesResults } from "@src/components/genshin/optimizer/upgrades/result/result"
import { Alert } from "@src/popup/alert"
import { RunUpgradesOptimizer } from "@src/genshin/run/upgrades-optimizer"

export function Config() {
  const [calc, exec] = useCalc()

  function show() {
    if (!calc.Results.Upgrades) { return }

    Alert({
      full: true,
      title: GetString("LABEL.RESULTS"),
      content: <UpgradesResults
        results={calc.Results.Upgrades} />
    })
  }

  async function optimize() {
    const { time, result, error } = await RunUpgradesOptimizer({
      Target: calc.Get().Scenario.Character?.GetCharacter().Options.Name,
      ...calc.Config.Upgrades,
    }, { terminate: false })


    exec(calc => {
      calc.Log("[WORKER] Upgrades optimizer:", GetString("LABEL.PROCESS_ENDED_TIME_X", {
        vars: {
          time: PrettyMs(time)
        }
      }))
    })

    calc.Results.Upgrades = result

    if (!error) {
      show()
    }
  }
  async function clear() {
    const confirm = await Confirm({ content: GetString("MSG.CONFIRM_RESULTS_CLEAR") })
    if (!confirm) return
    exec(calc => calc.Results.Upgrades = undefined)
  }

  return <div className="flex flex-col gap-1">
    <OptimizerButton
      onRun={optimize}
      onShow={show}
      onClear={clear}
      show={!!calc.Results.Upgrades} />
    <UpgradesConfig config={calc.Config.Upgrades} />
  </div>
}
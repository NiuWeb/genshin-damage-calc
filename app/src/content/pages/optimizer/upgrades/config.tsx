import { OptimizerButton } from "@src/components/genshin/optimizer/button"
import { useCalc } from "@src/genshin/context"
import { RunOptimizer } from "@src/genshin/run/optimizer"
import { GetString } from "@src/strings/strings"
import { PrettyMs } from "@src/utils/pretty-ms"
import { genshin } from "@src/genshin/core"
import { Confirm } from "@src/popup/confirm"
import { UpgradesConfig } from "@src/components/genshin/optimizer/upgrades/config"
import { UpgradesResults } from "@src/components/genshin/optimizer/upgrades/result/result"
import { Alert } from "@src/popup/alert"

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
    const { time, transform, error } = await RunOptimizer("UpgradesOptimizer", {
      Target: calc.Get().Scenario.Character?.GetCharacter().Options.Name,
      ...calc.Config.Upgrades,
    }, { chunk: 1, terminate: false })


    exec(calc => {
      calc.Log("[WORKER] Upgrades optimizer:", GetString("LABEL.PROCESS_ENDED_TIME_X", {
        vars: {
          time: PrettyMs(time)
        }
      }))
    })

    calc.Results.Upgrades = transform as genshin.optimizer.upgrades.Result[][]

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
import { OptimizerButton } from "@src/components/genshin/optimizer/button"
import { NextRollConfig } from "@src/components/genshin/optimizer/nextrolls/config"
import { NextRollResult } from "@src/components/genshin/optimizer/nextrolls/result"
import { useCalc } from "@src/genshin/context"
import { RunOptimizer } from "@src/genshin/run/optimizer"
import { Alert } from "@src/popup/alert"
import { Confirm } from "@src/popup/confirm"
import { GetString } from "@src/strings/strings"
import { PrettyMs } from "@src/utils/pretty-ms"

export function Config() {
  const [calc, exec] = useCalc()

  function show() {
    if (!calc.Results.NextRoll) { return }
    Alert({
      title: GetString("LABEL.RESULTS"),
      content: <NextRollResult
        config={calc.Config.NextRoll}
        results={calc.Results.NextRoll} />
    })
  }

  async function clear() {
    const confirm = await Confirm({ content: GetString("MSG.CONFIRM_RESULTS_CLEAR") })
    if (!confirm) return
    exec(calc => calc.Results.NextRoll = undefined)
  }
  async function optimize() {
    const { time, result, error } = await RunOptimizer("NextRollOptimizer", {
      Target: calc.Get().Scenario.Character?.GetCharacter().Options.Name,
      ...calc.Config.NextRoll
    }, { chunk: 100 })

    exec(calc => {
      calc.Log("[WORKER] Next roll optimizer:", GetString("LABEL.PROCESS_ENDED_TIME_X", {
        vars: {
          time: PrettyMs(time)
        }
      }))
      calc.Results.NextRoll = result
      if (!error) {
        show()
      }
    })
  }
  return <div className="flex flex-col gap-1">
    <NextRollConfig config={calc.Config.NextRoll} onChange={() => exec()} />
    <OptimizerButton
      onRun={optimize}
      onShow={show}
      onClear={clear}
      show={!!calc.Results.NextRoll} />
  </div>
}
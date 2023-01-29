import { OptimizerButton } from "@src/components/genshin/optimizer/button"
import { SetConfig } from "@src/components/genshin/optimizer/set/config"
import { SetResult } from "@src/components/genshin/optimizer/set/result"
import { useCalc } from "@src/genshin/context"
import { RunOptimizer } from "@src/genshin/run/optimizer"
import { Alert } from "@src/popup/alert"
import { Confirm } from "@src/popup/confirm"
import { GetString } from "@src/strings/strings"
import { PrettyMs } from "@src/utils/pretty-ms"

export function Config() {
  const [calc, exec] = useCalc()

  function show() {
    if (!calc.Results.Set) { return }
    Alert({
      full: true,
      title: GetString("LABEL.RESULTS"),
      content: <SetResult results={calc.Results.Set} />
    })
  }
  async function clear() {
    const confirm = await Confirm({ content: GetString("MSG.CONFIRM_RESULTS_CLEAR") })
    if (!confirm) return
    exec(calc => calc.Results.Set = undefined)
  }
  async function optimize() {
    const { time, result, error } = await RunOptimizer("SetOptimizer", {
      Target: calc.Get().Scenario.Character?.GetCharacter().Options.Name,
      ...calc.Config.Set
    }, { chunk: 10 })

    exec(calc => {
      calc.Log("[WORKER] Set optimizer:", GetString("LABEL.PROCESS_ENDED_TIME_X", {
        vars: {
          time: PrettyMs(time)
        }
      }))
      calc.Results.Set = result
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
      show={!!calc.Results.Set} />
    <SetConfig config={calc.Config.Set} />
  </div>
}
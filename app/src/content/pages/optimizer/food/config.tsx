import { OptimizerButton } from "@src/components/genshin/optimizer/button"
import { FoodResult } from "@src/components/genshin/optimizer/food/result"
import { useCalc } from "@src/genshin/context"
import { RunOptimizer } from "@src/genshin/run/optimizer"
import { Alert } from "@src/popup/alert"
import { Confirm } from "@src/popup/confirm"
import { GetString } from "@src/strings/strings"
import { PrettyMs } from "@src/utils/pretty-ms"

export function Config() {
  const [calc, exec] = useCalc()

  function show() {
    if (!calc.Results.Food) { return }
    Alert({
      full: true,
      title: GetString("LABEL.RESULTS"),
      content: <FoodResult results={calc.Results.Food} />
    })
  }
  async function clear() {
    const confirm = await Confirm({ content: GetString("MSG.CONFIRM_RESULTS_CLEAR") })
    if (!confirm) return
    exec(calc => calc.Results.Food = undefined)
  }
  async function optimize() {
    const { time, result, error } = await RunOptimizer("FoodOptimizer", {
      Target: calc.Get().Scenario.Character?.GetCharacter().Options.Name,
    }, { chunk: 10 })

    exec(calc => {
      calc.Log("[WORKER] Food optimizer:", GetString("LABEL.PROCESS_ENDED_TIME_X", {
        vars: {
          time: PrettyMs(time)
        }
      }))
      calc.Results.Food = result
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
      show={!!calc.Results.Food} />
  </div>
}
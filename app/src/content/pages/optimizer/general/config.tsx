import { OptimizerButton } from "@src/components/genshin/optimizer/button"
import { GeneralConfig } from "@src/components/genshin/optimizer/general/config"
import { useCalc } from "@src/genshin/context"
import { RunOptimizer } from "@src/genshin/run/optimizer"
import { GetString } from "@src/strings/strings"
import { PrettyMs } from "@src/utils/pretty-ms"
import { genshin } from "@src/genshin/core"
import { Alert } from "@src/popup/alert"
import { GeneralResult } from "@src/components/genshin/optimizer/general/result"
import { Confirm } from "@src/popup/confirm"

export function Config() {
  const [calc, exec] = useCalc()

  function show() {
    if (!calc.Results.General) { return }
    Alert({
      full: true,
      title: GetString("LABEL.RESULTS"),
      content: <GeneralResult
        results={calc.Results.General} />
    })
  }

  async function optimize() {
    const { time, result, error } = await RunOptimizer("GeneralOptimizer", {
      Target: calc.Get().Scenario.Character?.GetCharacter().Options.Name,
      ...calc.Config.General,
    }, { chunk: 10 })

    exec(calc => {
      calc.Log("[WORKER] General optimizer:", GetString("LABEL.PROCESS_ENDED_TIME_X", {
        vars: {
          time: PrettyMs(time)
        }
      }))
    })

    calc.Results.General = result?.filter(r => r !== undefined) as genshin.optimizer.general.Result[]

    if (!error) {
      show()
    }
  }
  async function clear() {
    const confirm = await Confirm({ content: GetString("MSG.CONFIRM_RESULTS_CLEAR") })
    if (!confirm) return
    exec(calc => calc.Results.General = undefined)
  }

  return <div className="flex flex-col gap-1">
    <OptimizerButton
      onRun={optimize}
      onShow={show}
      onClear={clear}
      show={!!calc.Results.General} />
    <GeneralConfig config={calc.Config.General} />
  </div>
}
import { OptimizerButton } from "@src/components/genshin/optimizer/button"
import { SubstatsConfig } from "@src/components/genshin/optimizer/substats/config"
import { SubstatsResults } from "@src/components/genshin/optimizer/substats/result"
import { useCalc } from "@src/genshin/context"
import { RunOptimizer } from "@src/genshin/run/optimizer"
import { Alert } from "@src/popup/alert"
import { Confirm } from "@src/popup/confirm"
import { GetString } from "@src/strings/strings"
import { PrettyMs } from "@src/utils/pretty-ms"

export function Config() {
  const [calc, exec] = useCalc()

  function show() {
    if (!calc.Results.Substats) { return }
    Alert({
      full: true,
      title: GetString("LABEL.RESULTS"),
      content: <SubstatsResults
        config={calc.Config.Substats}
        results={calc.Results.Substats} />
    })
  }
  async function clear() {
    const confirm = await Confirm({ content: GetString("MSG.CONFIRM_RESULTS_CLEAR") })
    if (!confirm) return
    exec(calc => calc.Results.Substats = undefined)
  }
  async function optimize() {
    const { time, result, error } = await RunOptimizer("SubstatsOptimizer", {
      Target: calc.Get().Scenario.Character?.GetCharacter().Options.Name,
      ...calc.Config.Substats
    }, { chunk: 100 })

    exec(calc => {
      calc.Log("[WORKER] Substats optimizer:", GetString("LABEL.PROCESS_ENDED_TIME_X", {
        vars: {
          time: PrettyMs(time)
        }
      }))
      calc.Results.Substats = result
      if (!error) {
        show()
      }
    })
  }

  return <div className="flex flex-col gap-1">
    <SubstatsConfig config={calc.Config.Substats} onChange={() => exec()} />
    <OptimizerButton
      onRun={optimize}
      onShow={show}
      onClear={clear}
      show={!!calc.Results.Substats} />
  </div>
}
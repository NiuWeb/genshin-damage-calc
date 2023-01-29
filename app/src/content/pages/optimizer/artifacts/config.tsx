import { ArtifactsConfig } from "@src/components/genshin/optimizer/artifacts/config"
import { ArtifactResults } from "@src/components/genshin/optimizer/artifacts/result"
import { OptimizerButton } from "@src/components/genshin/optimizer/button"
import { useCalc } from "@src/genshin/context"
import { RunOptimizer } from "@src/genshin/run/optimizer"
import { Alert } from "@src/popup/alert"
import { Confirm } from "@src/popup/confirm"
import { GetString } from "@src/strings/strings"
import { PrettyMs } from "@src/utils/pretty-ms"

export function Config() {
  const [calc, exec] = useCalc()

  function show() {
    if (!calc.Results.Artifacts) { return }
    Alert({
      full: true,
      title: GetString("LABEL.RESULTS"),
      content: <ArtifactResults
        results={calc.Results.Artifacts}
        config={calc.Config.Artifacts} />
    })
  }
  async function clear() {
    const confirm = await Confirm({ content: GetString("MSG.CONFIRM_RESULTS_CLEAR") })
    if (!confirm) return
    exec(calc => calc.Results.Artifacts = undefined)
  }
  async function optimize() {
    const config = calc.Config.Artifacts
    config.artifacts = calc.Inventory.Store.Get()

    const { time, result, error } = await RunOptimizer("ArtifactsOptimizer", {
      Target: calc.Get().Scenario.Character?.GetCharacter().Options.Name,
      ...config
    }, { chunk: 2000 })

    exec(calc => {
      calc.Log("[WORKER] Artifacts optimizer:", GetString("LABEL.PROCESS_ENDED_TIME_X", {
        vars: {
          time: PrettyMs(time)
        }
      }))
      calc.Results.Artifacts = result
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
      show={!!calc.Results.Artifacts} />
    <ArtifactsConfig config={calc.Config.Artifacts} />
  </div>
}
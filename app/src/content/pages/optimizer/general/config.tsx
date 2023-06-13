import { OptimizerButton } from "@src/components/genshin/optimizer/button"
import { GeneralConfig } from "@src/components/genshin/optimizer/general/config"
import { useCalc } from "@src/genshin/context"
import { RunOptimizer } from "@src/genshin/run/optimizer"
import { GetString } from "@src/strings/strings"
import { PrettyMs } from "@src/utils/pretty-ms"

export function Config() {
  const [calc, exec] = useCalc()

  async function optimize() {

    const { time, result } = await RunOptimizer("GeneralOptimizer", {
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

    console.log(result)
  }

  return <div className="flex flex-col gap-1">
    <OptimizerButton
      onRun={optimize}
      onShow={() => 0}
      onClear={() => 0}
      show={false} />
    <GeneralConfig config={calc.Config.General} />
  </div>
}
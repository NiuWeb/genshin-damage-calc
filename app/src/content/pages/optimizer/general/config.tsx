import { genshin } from "@bygdle/genshin-calculator-core"
import { OptimizerButton } from "@src/components/genshin/optimizer/button"
import { GeneralConfig } from "@src/components/genshin/optimizer/general/config"
import { useCalc } from "@src/genshin/context"
import { RunOptimizer } from "@src/genshin/run/optimizer"
import { Alert } from "@src/popup/alert"
import { GetString } from "@src/strings/strings"
import { PrettyMs } from "@src/utils/pretty-ms"

export function Config() {
  const [calc, exec] = useCalc()

  async function optimize() {

    // run in client to get logs
    calc.ConsoleVisible = true
    calc.Log("[CLIENT] General optimizer log:")
    const prog = new genshin.optimizer.general.CombinatorCmd()
    prog.Program.Log.Out = () => void 0
    prog.Program.CompileString(calc.Config.General.ConfigCmd)()

    const { time, result, error } = await RunOptimizer("GeneralOptimizer", calc.Config.General, { chunk: 10 })

    exec(calc => {
      calc.Log("[WORKER] General optimizer:", GetString("LABEL.PROCESS_ENDED_TIME_X", {
        vars: {
          time: PrettyMs(time)
        }
      }))
    })

    console.log(result)
    if (error) {
      Alert({ content: error })
    }
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
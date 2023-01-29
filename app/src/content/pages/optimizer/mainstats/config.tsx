import { Checkbox } from "@src/components/checkbox/checkbox"
import { OptimizerButton } from "@src/components/genshin/optimizer/button"
import { MainstatConfig } from "@src/components/genshin/optimizer/mainstat/config"
import { MainstatResult } from "@src/components/genshin/optimizer/mainstat/result"
import { SubstatsConfig } from "@src/components/genshin/optimizer/substats/config"
import { useCalc } from "@src/genshin/context"
import { RunOptimizer } from "@src/genshin/run/optimizer"
import { Alert } from "@src/popup/alert"
import { Confirm } from "@src/popup/confirm"
import { GetString } from "@src/strings/strings"
import { PrettyMs } from "@src/utils/pretty-ms"

export function Config() {
  const [calc, exec] = useCalc()

  function toggle(v: boolean) {
    if (v) {
      exec(calc => calc.Config.Mainstat.substats = calc.Config.Substats)
    } else {
      exec(calc => calc.Config.Mainstat.substats = undefined)
    }
  }
  function show() {
    if (!calc.Results.Mainstat) { return }
    Alert({
      full: true,
      title: GetString("LABEL.RESULTS"),
      content: <MainstatResult
        config={calc.Config.Mainstat}
        results={calc.Results.Mainstat} />
    })
  }
  async function clear() {
    const confirm = await Confirm({ content: GetString("MSG.CONFIRM_RESULTS_CLEAR") })
    if (!confirm) return
    exec(calc => calc.Results.Mainstat = undefined)
  }
  async function optimize() {
    const { time, result, error } = await RunOptimizer("MainstatOptimizer", {
      Target: calc.Get().Scenario.Character?.GetCharacter().Options.Name,
      ...calc.Config.Mainstat
    }, { chunk: 1 })

    exec(calc => {
      calc.Log("[WORKER] Substats optimizer:", GetString("LABEL.PROCESS_ENDED_TIME_X", {
        vars: {
          time: PrettyMs(time)
        }
      }))
      calc.Results.Mainstat = result
      if (!error) {
        show()
      }
    })
  }

  return <div className="flex flex-col gap-1">
    <MainstatConfig config={calc.Config.Mainstat} onChange={() => exec()} />
    <div className="flex gap-1 items-center">
      <Checkbox checked={!!calc.Config.Mainstat.substats} onChange={toggle} />
      <span onClick={() => toggle(!calc.Config.Mainstat.substats)}>
        {GetString("ACTION.OPTIMIZER_USE_OPTIMAL_SUBSTATS")}
      </span>
    </div>
    {
      calc.Config.Mainstat.substats &&
      <SubstatsConfig config={calc.Config.Mainstat.substats} onChange={() => exec()} />
    }
    <OptimizerButton
      onRun={optimize}
      onShow={show}
      onClear={clear}
      show={!!calc.Results.Mainstat} />
  </div>
}
import { MonacoEditor } from "@src/components/monaco/monaco"
import { useCalc } from "@src/genshin/context"
import { genshin } from "@src/genshin/core"
import { Alert } from "@src/popup/alert"
import { Loading } from "@src/popup/loading"
import { GetString } from "@src/strings/strings"
import { PrettyMs } from "@src/utils/pretty-ms"
import { ArrowReturnRight } from "react-bootstrap-icons"
import { useNavigate } from "react-router"

const EDITOR_FNAME = "rotation_editor"

export function PageRotationEditor() {
  const [calc, exec] = useCalc()
  const navigate = useNavigate()
  async function run() {
    const loading = new Loading()

    const worker = new genshin.worker.RotationDamage()
    const party = calc.Get().Scenario.Party
    try {
      const { log, summary, details } = await worker.Run(party, calc.Editor.GetFile(EDITOR_FNAME))
      //worker.Kill()
      const time = loading.End()

      exec((calc) => {
        calc.Log("[WORKER] Rotation run log:\n", log)
        calc.Log("[WORKER] Rotation run:", GetString("LABEL.PROCESS_ENDED_TIME_X", {
          vars: {
            time: PrettyMs(time)
          }
        }))
        if (summary && details) {
          calc.Results.Rotation = { summary, details }
        } else {
          calc.Results.Rotation = undefined
        }
      })
      navigate("/rotation/result")
    } catch (e) {
      loading.End()
      Alert({
        content: String(e).valueOf()
      })
    }
  }

  return <div className="rotation-editor flex flex-col h-full">
    <div className="rotation-editor-header">
      <button
        onClick={run}
        className="text-black px-2 py-1 bg-green-600 hover:bg-green-700 active:bg-green-800">
        <div className="flex gap-1 items-center">
          <ArrowReturnRight />
          {GetString("ACTION.RUN")}
        </div>
      </button>
    </div>
    <div className="grow">
      <MonacoEditor
        path="/rotation"
        theme="genshin-cmd-theme"
        language="genshin-cmd"
        value={calc.Editor.GetFile(EDITOR_FNAME)}
        onChange={value => calc.Editor.SetFile(EDITOR_FNAME, value)}
      />
    </div>
  </div>
}
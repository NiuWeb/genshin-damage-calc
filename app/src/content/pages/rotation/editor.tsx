import { Code } from "@src/components/console/code"
import { exportImage } from "@src/components/datatable/export/image"
import { MonacoEditor } from "@src/components/monaco/monaco"
import { useCalc } from "@src/genshin/context"
import { genshin } from "@src/genshin/core"
import { Alert } from "@src/popup/alert"
import { Loading } from "@src/popup/loading"
import { GetString } from "@src/strings/strings"
import { PrettyMs } from "@src/utils/pretty-ms"
import { useEffect } from "react"
import { ArrowReturnRight, Camera } from "react-bootstrap-icons"
import { createRoot } from "react-dom/client"
import { useNavigate } from "react-router"

const EDITOR_FNAME = "rotation_editor"

const imageRoot = document.createElement("div")
document.body.appendChild(imageRoot)
imageRoot.id = "rotation-editor-image-root"
imageRoot.setAttribute("style", "position: absolute; top: 0; left: 0; width: 100%")


function Render({ children, onRender }: { children: React.ReactNode, onRender?: () => void }) {

  useEffect(() => {
    onRender?.()
  }, [])

  return <>{children}</>
}

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

  async function photo() {
    const code = calc.Editor.GetFile(EDITOR_FNAME)
    imageRoot.innerHTML = ""

    const root = createRoot(imageRoot)

    await new Promise<void>((resolve) => {
      root.render(<Render onRender={resolve}>
        <Code pre>{code}</Code>
      </Render>)
    })

    await new Promise<void>(resolve => setTimeout(resolve, 100))

    await exportImage(imageRoot)
    root.unmount()
    imageRoot.innerHTML = ""
  }

  return <div className="rotation-editor flex flex-col h-full">
    <div className="rotation-editor-header flex justify-between">
      <button
        onClick={run}
        className="text-black px-2 py-1 bg-green-600 hover:bg-green-700 active:bg-green-800">
        <div className="flex gap-1 items-center">
          <ArrowReturnRight />
          {GetString("ACTION.RUN")}
        </div>
      </button>

      <button
        onClick={photo}
        className="text-black px-2 py-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800">
        <Camera />
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
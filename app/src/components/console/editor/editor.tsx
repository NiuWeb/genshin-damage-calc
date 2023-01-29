import { useCalc } from "@src/genshin/context"
import { createPortal } from "react-dom"
import { XCircle, ArrowReturnRight, Backspace } from "react-bootstrap-icons"
import { Tooltip } from "@src/components/tooltip/tooltip"
import { ConsoleOutput } from "../output/output"
import { ConsoleInput } from "../input/input"
import { GetString } from "@src/strings/strings"
import { MonacoEditor } from "@src/components/monaco/monaco"

const EDITOR_FNAME = "console_editor"
const root = document.getElementById("editor-root")

export function ConsoleEditor() {
  if (!root) {
    throw new Error("No root node")
  }
  const [calc] = useCalc()
  return createPortal(calc.EditorVisible && <InnerConsoleEditor />, root)
}

function InnerConsoleEditor() {
  const [calc, exec] = useCalc()

  function hide() {
    exec(calc => calc.EditorVisible = false)
  }
  function run() {
    const val = calc.Editor.GetFile(EDITOR_FNAME)
    exec(calc => {
      calc.Clear()
      calc.Run(val)
      calc.ConsoleVisible = true
    })
  }
  function clear() {
    exec(calc => calc.Clear())
  }
  return <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col bg-gray-900">
    <div  className="flex justify-between">
      <div >
        <button
          data-tooltip="console-editor-run-button"
          onClick={run}
          className="text-black p-2 bg-green-600 hover:bg-green-700 active:bg-green-800">
          <ArrowReturnRight />
        </button>
        <Tooltip id="console-editor-run-button">
          {GetString("ACTION.RUN")}
        </Tooltip>

        <button
          data-tooltip="console-editor-clear-button"
          onClick={clear}
          className="text-black p-2 bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800">
          <Backspace />
        </button>
        <Tooltip id="console-editor-clear-button">
          {GetString("ACTION.CLEAR")}
        </Tooltip>
      </div>
      <div >
        <button
          data-tooltip="console-editor-close-button"
          className="p-2 bg-red-600 hover:bg-red-700 active:bg-red-800"
          onClick={hide}>
          <XCircle />
        </button>
      </div>
    </div>
    <div  className="grow">
      <MonacoEditor
        path="/main"
        theme="genshin-cmd-theme"
        language="genshin-cmd"
        value={calc.Editor.GetFile(EDITOR_FNAME)}
        onChange={code => calc.Editor.SetFile(EDITOR_FNAME, code)} />
    </div>
    <ConsoleInput />
    <ConsoleOutput show />
    <Tooltip id="console-editor-close-button">
      {GetString("ACTION.EDITOR_CLOSE")}
    </Tooltip>
  </div>
}

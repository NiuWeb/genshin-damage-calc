import { Tooltip } from "@src/components/tooltip/tooltip"
import { useCalc } from "@src/genshin/context"
import { GetString } from "@src/strings/strings"
import { useEffect, useState } from "react"
import { CaretDownFill, CaretUpFill, ArrowReturnRight, Backspace, WindowFullscreen } from "react-bootstrap-icons"

/** An inline text input to write calc commands */
export function ConsoleInput() {
  const [calc, exec] = useCalc()
  const [value, setValue] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [position, setPosition] = useState(-1)

  useEffect(() => {
    setValue(history[position] || "")
  }, [position, history])

  function run() {
    exec(calc => {
      calc.Run(value)
      calc.ConsoleVisible = true
    })
    setHistory(hist => [value, ...hist])
    setValue("")
    setPosition(-1)
  }
  function clear() {
    exec(calc => calc.Clear())
  }
  function toggle() {
    exec(calc => calc.ConsoleVisible = !calc.ConsoleVisible)
  }
  function historyUp() {
    setPosition(pos => Math.min(pos + 1, history.length))
  }
  function historyDown() {
    setPosition(pos => Math.max(pos - 1, -1))
  }
  function toggleEditor() {
    exec(calc => calc.EditorVisible = !calc.EditorVisible)
  }
  return <div  className="flex">
    <button
      onClick={toggle}
      data-tooltip="console-input-toggle-button"
      className=" text-black px-2 py-1 bg-slate-600 hover:bg-slate-700 active:bg-slate-800">
      {calc.ConsoleVisible && <CaretDownFill />}
      {!calc.ConsoleVisible && <CaretUpFill />}
    </button>
    <Tooltip id="console-input-toggle-button">
      {GetString("ACTION.CONSOLE_TOGGLE")}
    </Tooltip>
    <input
      className=" grow bg-black text-white font-mono p-1"
      value={value}
      spellCheck={false}
      placeholder={GetString("PLACEHOLDER.CONSOLE_INPUT")}
      onChange={ev => setValue(ev.target.value)}

      onKeyDown={ev => {
        switch (ev.key) {
          case "Enter":
            run()
            break
          case "ArrowUp":
            historyUp()
            break
          case "ArrowDown":
            historyDown()
            break
        }
      }}
    />
    <button
      data-tooltip="console-input-run-button"
      onClick={run}
      className="text-black px-2 py-1 bg-green-600 hover:bg-green-700 active:bg-green-800">
      <ArrowReturnRight />
    </button>
    <Tooltip id="console-input-run-button">
      {GetString("ACTION.RUN")}
    </Tooltip>

    <button
      data-tooltip="console-input-clear-button"
      onClick={clear}
      className="text-black px-2 py-1 bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800">
      <Backspace />
    </button>
    <Tooltip id="console-input-clear-button">
      {GetString("ACTION.CLEAR")}
    </Tooltip>

    <button
      data-tooltip="console-input-paste-button"
      onClick={toggleEditor}
      className="text-black px-2 py-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800">
      <WindowFullscreen />
    </button>
    <Tooltip id="console-input-paste-button">
      {GetString("ACTION.EDITOR_OPEN")}
    </Tooltip>
  </div>
}
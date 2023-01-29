import { GetString } from "@src/strings/strings"

export function OptimizerButton(props: {
  onRun(): void
  onShow(): void
  onClear(): void
  show?: boolean
}) {
  return <>
    <button
      onClick={props.onRun}
      className="p-2 text-black bg-blue-500 hover:bg-blue-600 active:bg-blue-700">
      {GetString("ACTION.OPTIMIZE")}
    </button>
    {props.show && <>
      <button
        onClick={props.onShow}
        className="px-2 text-black bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700">
        {GetString("ACTION.RESULTS_SHOW")}
      </button>
      <button
        onClick={props.onClear}
        className="px-2 text-black bg-red-500 hover:bg-red-600 active:bg-red-700">
        {GetString("ACTION.RESULTS_CLEAR")}
      </button>
    </>
    }
  </>
}
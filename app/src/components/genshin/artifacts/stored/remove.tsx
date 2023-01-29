import { Tooltip } from "@src/components/tooltip/tooltip"
import { Confirm } from "@src/popup/confirm"
import { GetString } from "@src/strings/strings"
import { useContext, useMemo } from "react"
import { XCircle } from "react-bootstrap-icons"
import { StoredContext } from "./context"

export function Remove() {
  const props = useContext(StoredContext)
  const id = useMemo(() => Math.random().toString(35), [props.artifact])

  async function remove() {
    const confirm = await Confirm({ content: GetString("MSG.CONFIRM_ARTIFACT_REMOVE") })
    if (!confirm) {
      return
    }
    props.store.Remove(props.artifact)
    props.onChange?.()
  }

  return <button
    onClick={remove}
    data-tooltip={id}
    className="p-1 bg-red-500 hover:bg-red-600 active:bg-red-700">
    <XCircle />
    <Tooltip id={id}>
      {GetString("ACTION.REMOVE")}
    </Tooltip>
  </button>
}
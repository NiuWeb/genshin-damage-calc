import { Tooltip } from "@src/components/tooltip/tooltip"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useContext, useMemo } from "react"
import { Lock, Unlock } from "react-bootstrap-icons"
import { StoredContext } from "./context"

export function LockToggle() {
  const props = useContext(StoredContext)
  const id = useMemo(() => Math.random().toString(35), [props.artifact])

  async function toggle() {
    props.real.Locked = !props.real.Locked
    props.store.Replace(props.artifact, genshin.artifact.Export(props.real))
    props.onChange?.()
  }

  return <button
    onClick={toggle}
    data-tooltip={id}
    className="p-1 text-black bg-orange-500 hover:bg-orange-600 active:bg-orange-700">
    {props.real.Locked ? (
      <Lock />
    ) : (
      <Unlock />
    )}
    <Tooltip id={id}>
      {props.real.Locked ? GetString("ACTION.UNLOCK") : GetString("ACTION.LOCK")}
    </Tooltip>
  </button>
}
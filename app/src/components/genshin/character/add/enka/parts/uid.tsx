import { useContext } from "react"
import { EnkaModalContext } from "../context"

export function UidInput() {
  const { UID, setUID } = useContext(EnkaModalContext)

  function change(str: string) {
    str = str.replace(/[^0-9]/g, "")
    if (str.length > 9) { str = str.slice(0, 9) }
    setUID(str)
  }
  return <input
    autoFocus
    placeholder="UID"
    value={UID}
    onChange={ev => change(ev.target.value)}
    type="text"
    className="w-full p-1 bg-neutral-900" />
}
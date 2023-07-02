import { useContext } from "react"
import { EnkaModalContext } from "../context"

export function RawField() {
  const { raw, setRaw } = useContext(EnkaModalContext)
  return <textarea
    value={raw}
    onChange={ev => setRaw(ev.target.value)}
    className="w-[360px] h-[96px] p-1 bg-neutral-900 font-mono resize-none" />
}
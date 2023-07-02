import { useContext } from "react"
import { EnkaModalContext } from "../context"
import { ImportButton } from "./button"
import { genshin } from "@src/genshin/core"
import { Alert } from "@src/popup/alert"

export function RawImport() {
  const { raw, hide, onLoad } = useContext(EnkaModalContext)
  const disabled = !raw || !raw.trim()

  function load() {
    try {
      const json = JSON.parse(raw)
      const data = genshin.api.enka.ParseEnka(json)
      onLoad?.(data)
      hide()
    } catch (e) {
      Alert({
        content: String(e).valueOf()
      })
    }
  }

  return <ImportButton
    onClick={() => load()}
    disabled={disabled} />
}
import { useContext } from "react"
import { ImportButton } from "./button"
import { UidInput } from "./uid"
import { EnkaModalContext } from "../context"
import { Alert } from "@src/popup/alert"
import { genshin } from "@src/genshin/core"
import { Loading } from "@src/popup/loading"

export function Import() {

  const { UID, hide, onLoad } = useContext(EnkaModalContext)

  async function load() {
    const loading = new Loading()
    try {
      const data = await genshin.api.enka.GetEnka(UID)
      onLoad?.(data)
      hide()
      loading.End()
    } catch (e) {
      Alert({
        content: String(e).valueOf()
      })
      loading.End()
    }
  }

  return <div className="flex">
    <UidInput />
    <ImportButton onClick={load} />
  </div>
}
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { Markdown } from "@src/components/markdown/markdown"
import { EnkaModalContext } from "../context"
import { useContext } from "react"

function getUrl(uid: string) {
  if (!uid) {
    return genshin.api.enka.GetEnkaUrl("<your-uid>")
  }
  return genshin.api.enka.GetEnkaUrl(uid)
}
export function PasteText() {
  const { UID } = useContext(EnkaModalContext)
  const url = getUrl(UID)

  return <div className=" w-[360px]">
    <Markdown
      linebreak
      components={{
        a: ({ children, ...props }) => <a {...props} target="_blank">{children}</a>
      }}>
      {GetString("LABEL.ENKA_IMPORT_MANUAL", {
        vars: { url }
      })}
    </Markdown>
  </div>
}
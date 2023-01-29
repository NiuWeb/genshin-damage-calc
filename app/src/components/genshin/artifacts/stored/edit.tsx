import { Tooltip } from "@src/components/tooltip/tooltip"
import { genshin } from "@src/genshin/core"
import { Confirm } from "@src/popup/confirm"
import { GetString } from "@src/strings/strings"
import { useContext, useMemo } from "react"
import { Pencil } from "react-bootstrap-icons"
import { ArtifactCard } from "../../artifact/artifact"
import { StoredContext } from "./context"

export function Edit() {
  const props = useContext(StoredContext)
  const id = useMemo(() => Math.random().toString(35), [props.artifact])

  async function edit() {

    const art = new genshin.artifact.Artifact(props.artifact.piece)
    genshin.artifact.Import(props.artifact, art)

    const confirm = await Confirm({
      title: GetString("ACTION.EDIT"),
      content: <ArtifactCard artifact={art} />
    })
    if (!confirm) {
      return
    }

    const changed = genshin.artifact.Export(art)
    props.store.Replace(props.artifact, changed)

    props.onChange?.()
  }

  return <button
    onClick={edit}
    data-tooltip={id}
    className="p-1 text-black bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700">
    <Pencil />
    <Tooltip id={id}>
      {GetString("ACTION.EDIT")}
    </Tooltip>
  </button>
}
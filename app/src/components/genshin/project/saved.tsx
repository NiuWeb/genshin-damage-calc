import { Tooltip } from "@src/components/tooltip/tooltip"
import { useCalc } from "@src/genshin/context"
import { genshin } from "@src/genshin/core"
import { Confirm } from "@src/popup/confirm"
import { RemoveProject } from "@src/storage/projects"
import { GetString } from "@src/strings/strings"
import { useMemo } from "react"
import { Upload, XCircle } from "react-bootstrap-icons"
import { useNavigate } from "react-router"
import { ElementIcon } from "../auras/icon"

export function SavedProject({ name, project }: {
  name: string
  project: genshin.charbox.ExportedParty
}) {
  const navigate = useNavigate()
  const [calc, exec] = useCalc()

  const members = useMemo(() => (
    Object.keys(project.characters).map((name, i) => {
      const label = GetString("ITEM." + name) + ` (Lv. ${project.characters[name].character.level})`
      const data = genshin.characters.FindByName(name)

      if (data) {
        return <div key={i} className="flex items-center gap-1">
          <ElementIcon element={data.Element} />
          {label}
        </div>
      }
      return label
    })
  ), [name, project])

  function load() {
    const party = genshin.store.PartyFrom(project)
    calc.Projects.Open(name, party)
    navigate("/scenario/attributes")
  }

  async function remove() {
    const confirm = await Confirm({
      content: GetString("MSG.CONFIRM_PROJECT_REMOVE", { vars: { name } })
    })
    if (!confirm) { return }
    RemoveProject(name)
    exec()
  }

  const id = Math.random().toString(36)

  return <div className="p-1 bg-slate-700 flex gap-2 items-center">
    <div className="grow">
      {name}
    </div>
    <div className="flex gap-2">
      {members.map((name, i) => (
        <div key={i}>{name}</div>
      ))}
    </div>
    <button
      onClick={load}
      data-tooltip={id}
      className="p-2 text-black bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700">
      <Upload />
    </button>
    <button
      onClick={remove}
      data-tooltip={id + "-remove"}
      className="p-2 bg-red-500 hover:bg-red-600 active:bg-red-700">
      <XCircle />
    </button>
    <Tooltip id={id}>
      {GetString("ACTION.LOAD")}
    </Tooltip>
    <Tooltip id={id + "-remove"}>
      {GetString("ACTION.REMOVE")}
    </Tooltip>
  </div>
}
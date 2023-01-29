import { Tooltip } from "@src/components/tooltip/tooltip"
import { useCalc } from "@src/genshin/context"
import { Confirm } from "@src/popup/confirm"
import { Prompt } from "@src/popup/prompt"
import { HasProject, SaveProject } from "@src/storage/projects"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { ArrowRightSquare, Download, XCircle } from "react-bootstrap-icons"
import { useNavigate } from "react-router"

const MAX_LEN = 40
export function Project({ name }: { name: string }) {
  const [calc, exec] = useCalc()
  const navigate = useNavigate()

  const finalName = name.slice(0, MAX_LEN) + (name.length > MAX_LEN ? "..." : "")

  async function close() {
    const confirm = await Confirm({ content: GetString("MSG.CONFIRM_CLOSE_PROJECT", { vars: { name } }) })
    if (!confirm) {
      return
    }
    exec(calc => calc.Projects.Close(name))
  }

  function set() {
    exec(calc => calc.Projects.Set(name))
  }

  async function save() {
    const newName = await Prompt({
      defaultValue: name,
      title: GetString("ACTION.SAVE"),
      placeholder: GetString("PLACEHOLDER.PROJECT_TITLE"),
    })
    if (!newName || !newName.trim().length) {
      return
    }
    if (HasProject(newName)) {
      const confirm = await Confirm({
        content: GetString("MSG.CONFIRM_PROJECT_OVERRIDE", { vars: { name: newName } })
      })
      if (!confirm) { return }
    }

    const proj = calc.Projects.Get(name)
    if (calc.Projects.Rename(name, newName)) {
      SaveProject(newName, proj)
    }
    exec()
  }

  function goto() {
    set()
    navigate("/scenario/attributes")
  }

  const isCurrent = calc.Projects.IsCurrent(name)

  return <div className={classes(
    "flex",
    isCurrent ?
      "bg-black/25" :
      ""
  )}>
    <div
      onClick={set}
      className="grow p-1 hover:bg-black/10 hover:cursor-pointer">
      {finalName}
    </div>
    <button
      onClick={goto}
      data-tooltip={"edit-" + name}
      className="px-2 py-1 text-black bg-green-500 hover:bg-green-600 active:bg-green-700">
      <ArrowRightSquare />
    </button>
    <button
      onClick={save}
      data-tooltip={"save-" + name}
      className="px-2 py-1 text-black bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700">
      <Download />
    </button>
    <button
      onClick={close}
      data-tooltip={"remove-" + name}
      className="px-2 py-1 bg-red-500 hover:bg-red-600 active:bg-red-700">
      <XCircle />
    </button>
    <Tooltip id={"edit-" + name}>
      {GetString("ACTION.EDIT")}
    </Tooltip>
    <Tooltip id={"save-" + name}>
      {GetString("ACTION.SAVE")}
    </Tooltip>
    <Tooltip id={"remove-" + name}>
      {GetString("ACTION.CLOSE")}
    </Tooltip>
  </div>
}
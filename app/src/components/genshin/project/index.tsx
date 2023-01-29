import { Tooltip } from "@src/components/tooltip/tooltip"
import { useCalc } from "@src/genshin/context"
import { genshin } from "@src/genshin/core"
import { Prompt } from "@src/popup/prompt"
import { GetString } from "@src/strings/strings"
import { PlusCircle } from "react-bootstrap-icons"
import { useNavigate } from "react-router"
import { Project } from "./project"

export function Projects() {
  const [calc, exec] = useCalc()
  const navigate = useNavigate()
  const projects = calc.Projects.List()

  async function add() {
    const title = await Prompt({
      title: GetString("ACTION.PROJECT_NEW"),
      placeholder: GetString("PLACEHOLDER.PROJECT_TITLE")
    })
    if (!title || !title.length || !title.trim().length) {
      return
    }

    exec(calc => {
      calc.Projects.Open(title, new genshin.charbox.Party())
    })
  }

  return <div className=" bg-slate-700 border border-black">
    <div className="p-1 text-xl font-bold bg-gray-800 flex items-center">
      <div className="grow">
        {GetString("LABEL.PROJECTS_OPEN")}
      </div>
      <button
        data-tooltip="new-project-button"
        onClick={add}
        className="p-1 text-black bg-green-500 hover:bg-green-600 active:bg-green-700">
        <PlusCircle />
      </button>
      <Tooltip id="new-project-button">
        {GetString("ACTION.PROJECT_NEW")}
      </Tooltip>
    </div>
    <div className="projects flex flex-col p-1 gap-0.5">
      {projects.map((name, i) => (
        <Project key={i} name={name} />
      ))}
    </div>
    <div className="p-1 text-xl font-bold bg-gray-800 flex items-center">
      <div className="grow">
        {GetString("LABEL.PROJECTS_SAVED")}
      </div>
    </div>
    <div className="p-1 text-center">
      <a onClick={() => navigate("/inventory/projects")} className="text-blue-400 hover:text-blue-500 hover:cursor-pointer">
        {GetString("LABEL.PROJECTS_GOTO_SAVED")}
      </a>
    </div>
  </div>
}
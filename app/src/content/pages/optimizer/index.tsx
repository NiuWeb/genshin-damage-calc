import { Markdown } from "@src/components/markdown/markdown"
import { GetString } from "@src/strings/strings"
import { useNavigate } from "react-router"
import { OptimizerList } from "./list"

export function PageOptimizer() {
  const navigate = useNavigate()
  function goto(page: string) { 
    navigate("/optimize/" + page)
  }
  return <div className="page-optimizer p-2 flex flex-col gap-2">
    {OptimizerList.map(({ string, path }, i) => (
      <div key={i} className="optimizer">
        <div className="bg-gray-800 p-1 text-xl flex">
          <div className="text-xl mr-auto">
            {GetString(string)}
          </div>
          <button
            onClick={() => goto(path)}
            className="text-black text-base font-normal px-2 py-1 bg-green-600 hover:bg-green-700 active:bg-green-800">
            {GetString("ACTION.GOTO_PAGE")}
          </button>
        </div>
        <div className="bg-slate-700 p-1">
          <Markdown>
            {GetString(string, { description: true }).split(".")[0]}
          </Markdown>
        </div>
      </div>
    ))}
  </div>
}
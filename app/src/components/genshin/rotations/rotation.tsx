import "./rotation.css"
import { RotationContent } from "@src/api/rotations/parse"
import { Markdown } from "@src/components/markdown/markdown"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { ElementBgColor } from "@src/genshin/utils/colors"
import { useCalc } from "@src/genshin/context"
import { useNavigate } from "react-router"
import { Confirm } from "@src/popup/confirm"

const EDITOR_FNAME = "rotation_editor"

export function RotationCard({ rotation }: { rotation: RotationContent }) {
  const [calc] = useCalc()
  const navigate = useNavigate()

  async function load() {
    const confirm = await Confirm({
      content: GetString("MSG.CONFIRM_ROTATION_LOAD_TO_EDITOR")
    })
    if (!confirm) { return }
    calc.Editor.SetFile(EDITOR_FNAME, rotation.content)
    navigate("/rotation/editor")
  }

  return <div className="rotation bg-slate-700">
    <div className="rotation-title px-2 py-1 text-xl font-bold bg-gray-800 flex justify-between">
      <span>{rotation.title}</span>
      <button
        onClick={load}
        className="text-black text-base font-normal px-2 py-1 bg-green-600 hover:bg-green-700 active:bg-green-800">
        {GetString("ACTION.LOAD_TO_EDITOR")}
      </button>
    </div>
    <div className="elements p-1 flex gap-1">
      {rotation.characters.map((char, i) => (
        <div key={i} className={classes("text-black p-1", ElementBgColor(char.element))}>
          {GetString("ITEM." + char.name)}
          <span className="font-bold"> C{char.constellation}</span>
        </div>
      ))}
    </div>
    <div className="p-1">
      <Markdown>{rotation.description}</Markdown>
    </div>
  </div>
}
import { Prompt } from "@src/popup/prompt"
import { GetString } from "@src/strings/strings"
import { GearFill } from "react-bootstrap-icons"

export function PageSizeButton({ value, onChange }: { value: number, onChange(value: number): void }) {

  async function change() {
    const strval = await Prompt({
      title: GetString("ACTION.CHANGE_PAGE_SIZE"),
      defaultValue: value.toString(),
    })
    if (!strval) return

    const intval = parseInt(strval)
    if (Number.isFinite(intval) && intval > 0) {
      onChange(intval)
    }
  }

  return <button
    onClick={change}
    className="p-1 bg-gray-600">
    <GearFill size={16} />
  </button>
}
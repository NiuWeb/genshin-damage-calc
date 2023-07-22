import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { GetString } from "@src/strings/strings"
import { exportActions } from "./actions"

export function ExportDropdown({ element }: { element?: HTMLElement | null }) {
  if (!element) {
    return null
  }

  async function run([index]: number[]) {
    const action = exportActions[index]
    if (!action || !element) {
      return
    }
    await action.action(element)
  }

  return <Dropdown
    className="p-1 bg-gray-600"
    title={GetString("ACTION.EXPORT")}
    onChange={run}
  >
    {exportActions.map((action, i) => (
      <DropdownItem key={i} value={i}>
        {GetString(action.label)}
      </DropdownItem>
    ))}
  </Dropdown>
}
import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { GetString } from "@src/strings/strings"
import { SelectedColumns } from "./hook"

export function SelectColumnsDropdown({ model }: { model: SelectedColumns }) {
  return <Dropdown
    className="p-1 bg-blue-600"
    multiple
    values={model.indexes()}
    onChange={model.set}
    title={GetString("LABEL.COLUMNS")}>
    {model.all().map((col, i) => (
      <DropdownItem key={i} value={model.index(col)}>
        {col}
      </DropdownItem>
    ))}
  </Dropdown>
}
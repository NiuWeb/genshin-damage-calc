import { classes } from "@src/utils/classes"
import { ReactNode } from "react"

export function DataTableRow({ cells, cellClassName }: {
  cells: ReactNode[],
  cellClassName?: string
}) {
  return <tr
    className={classes(
      "border-bollapse border border-black",
      "hover:bg-black/50"
    )}>
    {cells.map((c, i) => (
      <td key={i} className={classes(
        "border-bollapse border border-black",
        cellClassName
      )}>
        {c}
      </td>
    ))}
  </tr>

}
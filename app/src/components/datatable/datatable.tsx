import { ReactNode, useRef } from "react"
import { usePagination } from "../pagination/hook"
import { Pagination } from "../pagination/pagination"
import { SelectColumnsDropdown } from "./columns/control"
import { useColumns } from "./columns/hook"
import { ExportDropdown } from "./export/control"
import { DataTableRow } from "./row"

export interface DataTableProps {
  headers?: ReactNode[]
  rows?: ReactNode[][]
  pageSize?: number
  cellClassName?: string
}
export function DataTable({ headers, rows, ...props }: DataTableProps) {
  const pagination = usePagination(rows || [], props.pageSize || 30)
  const columns = useColumns(headers || [])
  const ref = useRef<HTMLTableElement>(null)

  return <div className="datatable flex flex-col gap-1 h-full">
    <div className="flex justify-between">
      <div className="flex gap-1">
        <SelectColumnsDropdown model={columns} />
        <ExportDropdown element={ref.current} />
      </div>
      <Pagination model={pagination} />
    </div>
    <div className="grow overflow-auto border-t border-b border-black">
      <table ref={ref} className="datatable w-full border-collapse bg-neutral-800">
        <thead className="bg-neutral-900">
          <tr className="border-bollapse border border-black">
            {columns.selected().map((h, i) => (
              <th key={i} className="px-2 border-bollapse border border-black">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pagination.Get().map((row, i) => (
            <DataTableRow
              key={i}
              cells={columns.items(row)}
              cellClassName={props.cellClassName} />
          ))}
        </tbody>
      </table>
    </div>
    <div className="flex justify-between">
      <div />
      <Pagination model={pagination} goto />
    </div>
  </div>
}
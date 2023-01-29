import { classes } from "@src/utils/classes"
import { ReactNode } from "react"
import { usePagination } from "../pagination/hook"
import { Pagination } from "../pagination/pagination"

export interface DataTableProps {
  headers?: ReactNode[]
  rows?: ReactNode[][]
  pageSize?: number
  cellClassName?: string
}
export function DataTable({ headers, rows, ...props }: DataTableProps) {
  const pagination = usePagination(rows || [], props.pageSize || 30)
  return <div className="datatable flex flex-col gap-1 h-full">
    <div className="text-center">
      <Pagination model={pagination} />
    </div>
    <div className="grow overflow-auto border-t border-b border-black">
      <table className="datatable w-full border-collapse">
        <thead className="bg-neutral-900">
          <tr className="border-bollapse border border-black">
            {headers?.map((h, i) => (
              <th key={i} className="px-2 border-bollapse border border-black">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pagination.Get().map((cell, i) => (
            <tr key={i} className="border-bollapse border border-black">
              {cell.map((c, i) => (
                <td key={i} className={classes(
                  "border-bollapse border border-black",
                  props.cellClassName
                )}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="text-center">
      <Pagination model={pagination} goto />
    </div>
  </div>
}
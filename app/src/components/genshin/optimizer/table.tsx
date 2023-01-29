
import { DataTable } from "@src/components/datatable/datatable"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { createDefaultColormap } from "@src/utils/colormap"
import { toPlaces } from "@src/utils/number"
import { ReactNode, useMemo } from "react"

function string(v: genshin.strings.TableCell): string {
  if (v === null || v === undefined) {
    return ""
  }
  return String(v).valueOf()
}

export function ResultsTable({ table, mapHeader, mapCell, min, max, maxRelative, ...more }: {
  table: genshin.strings.Table
  mapHeader?(header: string, i: number): ReactNode
  mapCell?(cell: string, header: string): ReactNode
  min?: number
  max?: number
  maxRelative?: number
  actionLabel?: ReactNode
  action?(index: number): void
}) {

  const colormap = useMemo(() => createDefaultColormap(min || 0, max || 0), [min, max])

  const data = useMemo(() => {
    const headers = table.GetHeaders().map(s => string(s))

    const elHeaders = headers.map((header, i) => {
      switch (header) {
        case "DAMAGE":
          return GetString("LABEL.DAMAGE")
        case "RELATIVE":
          return GetString("LABEL.RELATIVE")
        default:
          return mapHeader ? mapHeader(header, i) : header
      }
    })


    const elRows = table.GetRows().map(row => (
      row.map((cell, i) => {
        const strval = string(cell)
        const numval = parseFloat(strval.replace(/%/g, ""))
        const rel = numval / (maxRelative || 0)
        switch (headers[i]) {
          case "DAMAGE":
            return <div className="p-1 text-black" style={{ backgroundColor: colormap(numval) }}>
              {toPlaces(numval, 0)}
            </div>
          case "RELATIVE":
            return <div className="bg-neutral-900 w-[72px]">
              <div
                className="bg-yellow-500 text-black text-xs px-1 border-r border-dashed border-black"
                style={{ width: rel + "%" }}>
                {toPlaces(numval, 2)}%
              </div>
            </div>
          default:
            return mapCell ? mapCell(strval, headers[i]) : strval
        }
      })
    ))

    if (more.action) {
      elHeaders.push(GetString("LABEL.ACTION"))
      elRows.forEach((row, i) => (
        row.push(<div className="flex justify-center">
          <button
            onClick={() => more.action?.(i)}
            className="text-xs text-black p-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700">
            {more.actionLabel || GetString("LABEL.ACTION")}
          </button>
        </div>)
      ))
    }

    return {
      headers: elHeaders,
      rows: elRows
    }

  }, [table, colormap])

  return <DataTable {...data} />
}
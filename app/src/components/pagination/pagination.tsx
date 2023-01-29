import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { CaretLeftFill, CaretRightFill } from "react-bootstrap-icons"
import { NumberField } from "../number-field/number-field"
import { usePagination } from "./hook"

export function Pagination({ model, goto }: { model: ReturnType<typeof usePagination>, goto?: boolean }) {

  const left = Math.max(1, Math.min(model.pages - 3, model.page - 2))
  const right = Math.min(model.pages, left + 3)

  const squares: number[] = []
  for (let i = left; i <= right; i++) {
    squares.push(i)
  }

  return <div className="pagination inline-flex flex-col text-white">
    <div className="flex">
      <button onClick={() => model.Prev()} className="p-1 bg-blue-800 hover:bg-blue-900">
        <CaretLeftFill />
      </button>
      {squares.map(page => (
        <button
          key={page}
          onClick={() => model.Goto(page)}
          className={classes(
            "min-w-[24px] p-1 hover:bg-blue-700",
            page === model.page ? "bg-blue-500" : "bg-blue-600"
          )}>
          {page}
        </button>
      ))}
      <button onClick={() => model.Next()} className="p-1 bg-blue-800 hover:bg-blue-900">
        <CaretRightFill />
      </button>
    </div>
    {goto && model.pages > 4 && <div className="flex bg-blue-500 p-0.5 items-center">
      <div className="grow text-sm text-left">
        {GetString("ACTION.GOTO_PAGE")}
      </div>
      <div>
        <NumberField
          className="w-[48px] text-sm bg-gray-700/50"
          value={model.page}
          onChange={x => model.Goto(x)} />
      </div>
    </div>}
  </div>
}
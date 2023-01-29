import { usePagination } from "@src/components/pagination/hook"
import { Pagination } from "@src/components/pagination/pagination"
import { Tooltip } from "@src/components/tooltip/tooltip"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useReducer } from "react"
import { XCircle } from "react-bootstrap-icons"
import { ArtifactFilter } from "./filter"
import { GeneralFilter } from "./general"

export function Filters({ filters, general, onChange }: {
  filters: genshin.store.ArtifactFilter[]
  general: genshin.store.GeneralFilter
  onChange?(): void
}) {
  const [, update] = useReducer(x => (1 + x) % 6, 0)
  const pagination = usePagination(filters, 5)

  function remove(index: number) {
    filters.splice(index, 1)
    onChange?.()
    update()
    pagination.Update()
  }
  function add() {
    filters.push({})
    onChange?.()
    update()
    pagination.Update()
  }

  const id = Math.random().toString(36)
  return <div className="artifacts-filter-list flex flex-col gap-1">
    <GeneralFilter onChange={onChange} filter={general} />
    <button
      onClick={add}
      className="p-2 bg-sky-600 hover:bg-sky-600/70 active:bg-sky-600/40">
      {GetString("ACTION.FILTER_ADD")}
    </button>
    {pagination.Get().map((f, i) => (
      <div key={i} className="flex">
        <div className="grow">
          <ArtifactFilter filter={f} onChange={onChange} />
        </div>
        <button
          onClick={() => remove(i)}
          data-tooltip={"delete-" + id + "-" + i}
          className="px-2 bg-red-500 hover:bg-red-600 active:bg-red-700">
          <XCircle />
        </button>
        <Tooltip id={"delete-" + id + "-" + i}>
          {GetString("ACTION.REMOVE")}
        </Tooltip>
      </div>
    ))}
    {pagination.pages > 1 && (
      <div className="flex justify-center">
        <Pagination model={pagination} />
      </div>
    )}
  </div>
}
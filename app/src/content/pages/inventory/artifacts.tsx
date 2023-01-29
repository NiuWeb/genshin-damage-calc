import { ArtifactAddCard } from "@src/components/genshin/artifacts/add"
import { Filters } from "@src/components/genshin/artifacts/filter"
import { ArtifactsImportButton } from "@src/components/genshin/artifacts/actions/import"
import { StoredArtifact } from "@src/components/genshin/artifacts/stored"
import { usePagination } from "@src/components/pagination/hook"
import { Pagination } from "@src/components/pagination/pagination"
import { Calc } from "@src/genshin/calc"
import { genshin } from "@src/genshin/core"
import { Alert } from "@src/popup/alert"
import { Confirm } from "@src/popup/confirm"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { useReducer } from "react"
import { PlusSquareFill } from "react-bootstrap-icons"
import { ArtifactsExportButton } from "@src/components/genshin/artifacts/actions/export"

const store = Calc.Inventory.Store
const config = Calc.Config.Inventory

export function PageInventoryArtifacts() {
  const [, _update] = useReducer(x => (x + 1) % 6, 0)

  const pagination = usePagination(store.Get(), 11)

  function update() {
    store.Filter(config.filters, config.general)
    store.Update()
    _update()
    pagination.Update()
  }

  async function filter() {
    await Alert({
      title: GetString("LABEL.FILTERS"),
      content: <div className="min-w-[680px] flex flex-col gap-1">
        <Filters
          general={config.general}
          filters={config.filters} />
      </div>
    })
    update()
  }

  async function add() {
    let art: genshin.artifact.Artifact | undefined = undefined
    const confirm = await Confirm({
      title: GetString("ACTION.ADD"),
      content: <ArtifactAddCard onChange={a => art = a} />
    })
    if (!art || !confirm) {
      return
    }
    store.Add(art, "unshift")
    update()
  }

  async function doImport(arts: genshin.artifact.Artifact[]) {
    const confirm = await Confirm({
      content: GetString("MSG.IMPORT_ARTIFACTS_N_CONFIRM", { vars: { n: arts.length } })
    })
    if (!confirm) {
      return
    }
    store.Clear()
    arts.forEach(art => store.Add(art))
    update()
  }

  return <div className="page-inventory-artifacts flex flex-col gap-1">
    <div className="flex">
      <ArtifactsImportButton onLoad={doImport} />
      <ArtifactsExportButton artifacts={store.All()} />
      <button
        onClick={filter}
        className="grow w-full p-2 bg-gray-700 hover:bg-gray-700/50 active:bg-gray-700/25 hover:cursor-pointer">
        {GetString("LABEL.FILTERS_N", {
          vars: {
            n: config.filters.length
          }
        })}
      </button>
    </div>
    <div className="flex px-1 items-center">
      <div></div>
      <div className="grow flex justify-center">
        <Pagination model={pagination} />
      </div>
      <div>
        ({store.Get().length})
      </div>
    </div>
    <div className="grid px-1 gap-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
      <button onClick={add} className={classes(
        "add bg-gray-700 hover:bg-gray-700/50 active:bg-gray-700/25 hover:cursor-pointer",
        "flex justify-center items-center flex-col gap-2 p-2"
      )}>
        <PlusSquareFill size={64} />
        {GetString("ACTION.ADD")}
      </button>
      {pagination.Get().map((art, i) => (
        <StoredArtifact
          key={i}
          onChange={update}
          store={store}
          artifact={art} />
      ))}
    </div>
  </div>
}
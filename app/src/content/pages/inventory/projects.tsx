import { SavedProject } from "@src/components/genshin/project/saved"
import { useCalc } from "@src/genshin/context"
import { downloadFile } from "@src/genshin/utils/file"
import { useSearch } from "@src/hooks/search"
import { ExportProjects, GetProjects } from "@src/storage/projects"
import { GetString } from "@src/strings/strings"

export function PageProjects() {
  useCalc()
  const values = GetProjects()
  const search = useSearch({
    values,
    map([title, party]) {
      return [
        title,
        Object.keys(party.characters),
        Object.keys(party.characters).map(name => GetString("ITEM." + name))
      ]
    },
    ignoreCase: true
  })

  function exports() {
    downloadFile("projects.json", ExportProjects())
  }

  return <div className="page-projects p-2 flex flex-col gap-2">
    <div className="flex lg:flex-row flex-col">
      <button
        onClick={exports}
        className="p-2 text-black bg-green-500 hover:bg-green-600 active:bg-green-700">
        {GetString("ACTION.EXPORT")}
      </button>
      <input
        type="text"
        autoFocus
        value={String(search.Query()).valueOf()}
        onChange={ev => search.Set(ev.target.value)}
        placeholder={GetString("PLACEHOLDER.SEARCH")}
        className="grow bg-neutral-800 p-1 border border-neutral-400" />
    </div>
    <div className="grow overflow-auto flex flex-col gap-2">
      {search.Get().map(([name, project], i) => (
        <SavedProject key={i} {...{ name, project }} />
      ))}
    </div>
  </div >
}
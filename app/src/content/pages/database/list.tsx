import { Markdown } from "@src/components/markdown/markdown"
import { useSearch } from "@src/hooks/search"
import { GetString } from "@src/strings/strings"
import { StarFill } from "react-bootstrap-icons"
import { useDbList } from "./lists"

export function PageDbList({ list }: { list: "weapons" | "sets" }) {
  const dbList = useDbList(list)

  const search = useSearch({
    values: dbList,
    map: (item) => [item.id, item.name, item.description],
    ignoreCase: true
  })

  return <div className="flex flex-col gap-2 m-2">
    <div className="flex">
      <input
        className="w-full grow bg-neutral-800 p-1 border border-neutral-400"
        placeholder={GetString("PLACEHOLDER.SEARCH")}
        value={String(search.Query()).valueOf()}
        onChange={(e) => search.Set(e.target.value)}
      />
      <div className="bg-neutral-600 flex items-center whitespace-nowrap px-1">
        {search.Get().length} / {dbList.length}
      </div>
    </div>
    {search.Get().map(({ stars, id, name, description }) => (
      <div key={id} className="bg-slate-700">
        <div className="p-1 bg-gray-800 flex items-center gap-2">
          {stars} <StarFill />
          {name}
          <div className="bg-gray-900 font-mono text-sm">
            {id}
          </div>
        </div>
        <div className="p-1">
          <Markdown
            components={{
              strong: ({ children }) => <span className="text-yellow-500">{children}</span>
            }}
            linebreak>
            {description}
          </Markdown>
        </div>
      </div>
    ))}
  </div>
}
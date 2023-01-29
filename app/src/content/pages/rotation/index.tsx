import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { RotationsContext } from "@src/components/genshin/rotations/context"
import { RotationCard } from "@src/components/genshin/rotations/rotation"
import { Markdown } from "@src/components/markdown/markdown"
import { usePagination } from "@src/components/pagination/hook"
import { Pagination } from "@src/components/pagination/pagination"
import { useCalc } from "@src/genshin/context"
import { useSearch } from "@src/hooks/search"
import { GetString } from "@src/strings/strings"
import { useContext, useState } from "react"

export function PageRotation() {
  const { online } = useContext(RotationsContext)
  const [calc] = useCalc()
  const [mode, setMode] = useState<"every" | "some">("some")

  const members = calc.Get().Scenario.Party.GetMembers()
    .map(s => GetString("ITEM." + s.GetCharacter().Options.Name))
    .join(", ")

  const search = useSearch({
    defaultValue: members.split(",")
      .map(part => part
        .trim()
        .replace(/\s+/g, " ")
      ),
    values: online,
    ignoreCase: true,
    mode,
    map(value) {
      return [
        value.characters.map(s => s.name + " C" + s.constellation),
        value.characters.map(s => GetString("ITEM." + s.name) + " C" + s.constellation),
        value.title
      ]
    }
  })

  const pagination = usePagination(search.Get(), 10)

  function changeSearch(str: string) {
    const parts = str
      .split(",")
      .map(part => part
        .trim()
        .replace(/\s+/g, " ")
      )
    search.Set(parts)
  }

  return <div className="page-rotations flex flex-col gap-2 p-2">

    <div className="flex lg:flex-row flex-col">
      <input
        type="text"
        autoFocus
        defaultValue={members}
        placeholder={GetString("PLACEHOLDER.SEARCH")}
        onChange={ev => changeSearch(ev.target.value)}
        className="grow bg-neutral-800 p-1 border-l border-t border-b border-neutral-400" />
      <Dropdown
        className="whitespace-nowrap  bg-gray-700 hover:bg-gray-800 border border-neutral-400 p-1"
        notEmpty
        values={[mode === "some" ? 0 : 1]}
        onChange={([v]) => v === 0 ? setMode("some") : setMode("every")}
        title={GetString("LABEL.ROTATION_SEARCH_" + mode.toUpperCase())}>
        <DropdownItem value={0}>
          {GetString("LABEL.ROTATION_SEARCH_SOME")}
        </DropdownItem>
        <DropdownItem value={1}>
          {GetString("LABEL.ROTATION_SEARCH_EVERY")}
        </DropdownItem>
      </Dropdown>
    </div>


    <div className="flex justify-center">
      <div className="paragraph max-w-[420px] bg-slate-600 p-1">
        <Markdown>{GetString("MSG.ALERT_ROTATION_DB")}</Markdown>
      </div>
    </div>

    <div className="flex justify-center">
      <Pagination model={pagination} />
    </div>

    {pagination.Get().map((rot, i) => (
      <RotationCard key={i} rotation={rot} />
    ))}
    {search.Get().length === 0 && (
      <div className="flex justify-center">
        {GetString("LABEL.ROTATION_NONE")}
      </div>
    )}
    {search.Get().length > 4 && (
      <div className="flex justify-center">
        <Pagination model={pagination} goto />
      </div>
    )}
  </div>
}
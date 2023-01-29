import { Accordion } from "@src/components/accordion/accordion"
import { AccordionItem } from "@src/components/accordion/item"
import { Tooltip } from "@src/components/tooltip/tooltip"
import { genshin } from "@src/genshin/core"
import { printStat } from "@src/genshin/utils/stat"
import { useSearch } from "@src/hooks/search"
import { GetString } from "@src/strings/strings"
import { createContext, useContext, useEffect } from "react"
import { Groups } from "./groups"


interface GroupedProps {
  character: genshin.character.Character,
  search?: string
}
const Context = createContext({} as GroupedProps)


export function GroupedStats({ character, search }: GroupedProps) {
  const items = useSearch({
    values: Groups,
    map: ([, stats]) => stats.map(stat => GetString("STAT." + genshin.stats.stat.Name(stat))),
    ignoreCase: true,
  })

  useEffect(() => void items.Set(search), [search])

  return <Context.Provider value={{ character, search }}>
    <Accordion initial={0}>
      {items.Get().map((group, i) => (
        <Group key={i} value={i} group={group} />
      ))}
    </Accordion>
  </Context.Provider>
}


function Group({ group: [name, list], value }: { group: [string, number[]], value: number }) {

  const { character, search } = useContext(Context)

  const items = useSearch({
    values: list,
    map: stat => GetString("STAT." + genshin.stats.stat.Name(stat)),
    ignoreCase: true,
  })

  useEffect(() => void items.Set(search), [search])

  const id = Math.random().toString(34)
  return <AccordionItem
    value={value}
    title={<div className="flex">
      <div className="grow">{GetString("STAT.GROUP_" + name)}</div>
      ({items.Get().length})
    </div>}>
    <div className="flex flex-col gap-1">
      {items.Get().map((stat, i) => (
        <div key={i} data-tooltip={id + stat} className="flex hover:bg-black/10 hover:cursor-pointer">
          <div className="grow">
            {GetString("STAT." + genshin.stats.stat.Name(stat))}
          </div>
          <div>
            {printStat(stat, character.Get(stat))}
          </div>
          <Tooltip id={id + stat}>
            {genshin.stats.stat.Name(stat)} ({stat})
          </Tooltip>
        </div>
      ))}
    </div>
  </AccordionItem>
}
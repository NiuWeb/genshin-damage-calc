import { ModalBody, ModalHeader } from "@src/components/modal/parts"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useState } from "react"
import { GroupedStats } from "./grouped"

export function MoreStats({ character }: {
  character: genshin.character.Character,
}) {
  const [search, setSearch] = useState("")
  return <>
    <ModalHeader>
      <div className="character-stats-more px-1">
        <input
          autoFocus
          type="text"
          placeholder={GetString("PLACEHOLDER.SEARCH")}
          value={search}
          onChange={ev => setSearch(ev.target.value)}
          className="w-full bg-transparent border border-neutral-700" />
      </div>
    </ModalHeader>
    <ModalBody>
      <div className="min-w-[640px] overflow-x-hidden p-1">
        <GroupedStats
          search={search}
          character={character} />
      </div>
    </ModalBody>
  </>
}
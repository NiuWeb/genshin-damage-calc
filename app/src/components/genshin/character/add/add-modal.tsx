import { Modal } from "@src/components/modal/modal"
import { ModalBody, ModalFooter, ModalHeader } from "@src/components/modal/parts"
import { usePagination } from "@src/components/pagination/hook"
import { Pagination } from "@src/components/pagination/pagination"
import { useCalc } from "@src/genshin/context"
import { genshin } from "@src/genshin/core"
import { useSearch } from "@src/hooks/search"
import { GetString } from "@src/strings/strings"
import { useState } from "react"
import { AddMultipleLoaded } from "./add-multiple-loaded"
import { CharacterUnloaded } from "./item-unloaded"
import { EnkaModalButton } from "./enka/button"
import { ImportButton } from "./enka/parts"

const characters = [...genshin.characters.GetList()]

export function AddCharacterModal({ show, onClose }: { show: boolean, onClose(): void }) {
  const [, exec] = useCalc()

  const [fromEnka, setFromEnka] = useState<genshin.charbox.Charbox[] | undefined>(undefined)
  const [toImport, setToImport] = useState<genshin.charbox.Charbox[]>([])

  const search = useSearch({
    values: characters,
    map: c => [
      GetString("ITEM." + c.Name),
      GetString("STAT." + genshin.stats.stat.Name(c.Element)),
      GetString("ITEM." + genshin.stats.weapon.Name(c.Weapon)),
    ],
    ignoreCase: true,
  })

  const pagination = usePagination(search.Get(), 15)

  function add(char: genshin.charbox.Generator) {
    exec(calc => calc.Run("character add " + char.Name))
    onClose()
  }

  function importEnka() {
    setFromEnka(undefined)
    if (!toImport.length) { return }
    exec(calc => {
      for (const char of toImport) {
        calc.Get().Scenario.Party.Add(char)
      }
      calc.Run("character set " + toImport[0].GetCharacter().Options.Name)
    })
  }

  return <>
    <Modal full show={show} onClose={onClose}>
      <ModalHeader>
        <div className="character-stats-more px-1 min-w-[640px]">
          <input
            autoFocus
            type="text"
            placeholder={GetString("PLACEHOLDER.SEARCH")}
            value={String(search.Query()).valueOf()}
            onChange={ev => search.Set(ev.target.value)}
            className="w-full bg-transparent border border-neutral-700" />
        </div>
      </ModalHeader>
      <ModalBody>
        <div className="p-1 flex justify-center">
          <EnkaModalButton onLoad={setFromEnka} />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-center">
            <Pagination model={pagination} />
          </div>
          {pagination.Get().map((char, i) => (
            <CharacterUnloaded
              key={i}
              onClick={add}
              name={char.Name} />
          ))}
          {!pagination.Get().length && (
            <div className="flex justify-center">
              {GetString("LABEL.RESULT_NONE")}
            </div>
          )}
        </div>
      </ModalBody>
    </Modal>

    <Modal show={!!fromEnka} onClose={() => setFromEnka(undefined)}>
      <ModalHeader>
        {GetString("ACTION.ENKA_IMPORT")}
      </ModalHeader>
      <ModalBody>
        {
          fromEnka && <AddMultipleLoaded
            list={fromEnka}
            selected={toImport}
            onChange={setToImport} />
        }
      </ModalBody>
      <ModalFooter>
        <ImportButton onClick={importEnka} />
      </ModalFooter>
    </Modal>
  </>
}
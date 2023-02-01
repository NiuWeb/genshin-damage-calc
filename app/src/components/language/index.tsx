import { StorageLoad, StorageSave } from "@src/storage/storage"
import { useLanguage } from "@src/strings/context"
import { GetLanguage, GetLanguages, GetString } from "@src/strings/strings"
import { useEffect } from "react"
import { Dropdown } from "../dropdown/dropdown"
import { DropdownItem } from "../dropdown/item"

const langs = GetLanguages()

const local = StorageLoad("language")

export function LanguageSelect() {
  const setLang = useLanguage()
  const current = GetLanguage()
  const selected = langs.findIndex(lang => current === lang)

  useEffect(() => {
    if (langs.includes(local)) {
      setLang(local)
    }
  }, [])

  function change([lang]: number[]) {
    setLang(langs[lang])
    StorageSave("language", langs[lang])
  }

  return <div className="app-language inline-block p-1  bg-black/80 hover:bg-black/90 active:bg-black ">
    <Dropdown
      notEmpty
      onChange={change}
      title={<span>
        {GetString("LANGUAGE." + current)} ({current})
      </span>}
      values={[selected || 0]}>
      {langs.map((lang, i) => (
        <DropdownItem key={i} value={i}>
          {GetString("LANGUAGE." + lang)} ({lang})
        </DropdownItem>
      ))}
    </Dropdown>
  </div>
}
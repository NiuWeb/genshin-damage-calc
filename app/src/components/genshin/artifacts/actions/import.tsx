import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { genshin } from "@src/genshin/core"
import { loadFile } from "@src/genshin/utils/file"
import { Alert } from "@src/popup/alert"
import { GetString } from "@src/strings/strings"

export function ArtifactsImportButton({ onLoad }: { onLoad(arts: genshin.artifact.Artifact[]): void }) {

  async function trigger([mode]: number[]) {
    const file = await loadFile(".json")
    if (!file) {
      return
    }
    if (mode === 0) {
      const arts = normal(file)
      if (arts) {
        onLoad(arts)
      }
    } else if (mode === 1) {
      const arts = good(file)
      if (arts) {
        onLoad(arts)
      }
    }
  }

  function good(file: string) {
    try {
      const data = genshin.api.good.Parse(JSON.parse(file))
      return data
    } catch (e) {
      const str = String(e).valueOf()
      Alert({ content: str })
      console.error(e)
    }
    return undefined
  }

  function normal(file: string) {
    try {
      const json: genshin.artifact.Exported[] = JSON.parse(file)
      return json.map(s => {
        const art = new genshin.artifact.Artifact(s.piece)
        genshin.artifact.Import(s, art)
        return art
      })
    } catch (e) {
      const str = String(e).valueOf()
      Alert({ content: str })
      console.error(e)
    }
    return undefined
  }

  return <Dropdown
    hideSearch
    onChange={trigger}
    className="p-2 text-black bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700"
    title={GetString("ACTION.IMPORT")}>

    <DropdownItem value={0}>
      {GetString("ACTION.IMPORT")}
    </DropdownItem>

    <DropdownItem value={1}>
      {GetString("ACTION.GOOD_IMPORT")}
    </DropdownItem>

  </Dropdown>
}
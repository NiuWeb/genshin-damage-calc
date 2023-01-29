import { useCalc } from "@src/genshin/context"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { PlusSquareFill } from "react-bootstrap-icons"

export function ArtifactsAdd({ charbox }: { charbox: genshin.charbox.Charbox }) {
  const [, exec] = useCalc()
  function add() {
    exec(() => {
      const box = new genshin.artbox.Artbox(charbox)
      box.GetArtifacts().forEach(art => art.FillSubstats())
      charbox.SetArtifacts(box)
    })
  }
  return <button
    onClick={add}
    className="artifact-add gap-2 p-4 flex justify-center items-center flex-col bg-gray-700 hover:bg-gray-700/50 active:bg-gray-700/25">
    <PlusSquareFill size={64} />
    <span>{GetString("ACTION.ARTIFACTS_ADD")}</span>
  </button>
}
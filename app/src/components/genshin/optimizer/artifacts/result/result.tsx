import { ArtifactCard } from "@src/components/genshin/artifact/artifact"
import { Calc } from "@src/genshin/calc"
import { genshin } from "@src/genshin/core"
import { Confirm } from "@src/popup/confirm"
import { GetString } from "@src/strings/strings"
import { toPlaces } from "@src/utils/number"
import { useContext } from "react"
import { ArtifactResultsContext } from "./context"

export function Result({ result }: { result: genshin.optimizer.artifacts.Result }) {
  const { optimizer } = useContext(ArtifactResultsContext)
  const data = optimizer.GetArtifacts(result)
  const artifacts = data.map(data => {
    const art = new genshin.artifact.Artifact(data.piece)
    genshin.artifact.Import(data, art)
    return art
  })

  async function equip() {
    const confirm = await Confirm({
      content: GetString("MSG.CONFIRM_EQUIP_ARTIFACT")
    })
    if (!confirm) { return }
    const target = Calc.Get().Scenario.Character
    if (!target) { return }

    let arts = target.GetArtifacts()
    if (!arts) {
      arts = new genshin.artbox.Artbox(target)
      target.SetArtifacts(arts)
    }

    for (const p of data) {
      const to = arts.Get(p.piece)
      genshin.artifact.Import(p, to)
    }

    await Calc.RunConfirm(result.cmd)

    const confirmLock = await Confirm({ content: GetString("MSG.CONFIRM_LOCK_ARTIFACT") })
    if (!confirmLock) { return }

    data.forEach((exp, i) => {
      artifacts[i].Locked = true
      const exported = genshin.artifact.Export(artifacts[i])
      Calc.Inventory.Store.Replace(exp, exported)
    })
  }

  return <div className="grid grid-cols-3 gap-1">
    <div className="col-span-3 flex bg-neutral-700">
      <div className="grow p-1 flex justify-center items-center gap-1">
        {GetString("LABEL.DAMAGE")}
        <div className="bg-yellow-500 text-xl font-bold text-black px-1">
          {toPlaces(result.damage, 0)}
        </div>
        <div className="bg-neutral-400 text-xl font-bold text-black px-1">
          {toPlaces(result.relative * 100, 2)}%
        </div>
      </div>

      <button
        onClick={equip}
        className="text-black p-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700">
        {GetString("LABEL.EQUIP")}
      </button>
    </div>
    {artifacts.map((art, i) => (
      <ArtifactCard key={i} artifact={art} readonly />
    ))}
  </div>
}
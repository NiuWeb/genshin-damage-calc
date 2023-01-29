import { useCalc } from "@src/genshin/context"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { SetSelect } from "../artifact/set-select"
import { EffectCard } from "../effect/effect"

export function SetsCard({ artbox }: {
  artbox: genshin.artbox.Artbox
}) {
  const [, exec] = useCalc()
  const sets: (string | undefined)[] = [...artbox.GetActiveSets()]
  if (sets.length < 2) {
    sets.push(undefined)
  }

  function change(index: number, set: string | undefined) {
    sets[index] = set
    exec(() => {
      artbox.Get(0).SetSet(sets[0])
      artbox.Get(1).SetSet(sets[0])
      artbox.Get(2).SetSet(sets[1])
      artbox.Get(3).SetSet(sets[1])
    })
  }

  const isFullSet = !!sets[0] && !!sets[1] && sets[0]?.toLowerCase() === sets[1]?.toLowerCase()

  return <div className="artifact-sets bg-slate-700">
    <div className="artifact-sets-header px-2 py-1 text-xl font-bold bg-gray-800">
      {GetString("LABEL.ARTIFACT_SETS")}
    </div>
    <div className="p-1 flex flex-col gap-1">
      {sets.map((set, i) => (
        <div key={i} className="set-index flex">
          <div className="set-select grow">
            <SetSelect set={set} onChange={set => change(i, set)} />
          </div>
          <div className="set-pieces">
            ({isFullSet ? 2 * (i + 1) : 2})
          </div>
        </div>
      ))}
    </div>
    {artbox.GetEffects().map((ef, i) => (
      <EffectCard key={i} effect={ef} onChange={() => exec()} />
    ))}
  </div>
}
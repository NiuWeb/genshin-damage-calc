import { EffectList } from "@src/components/genshin/effect/list"
import { ExtraEffectsList } from "@src/components/genshin/effect/list/extra"
import { PartyList } from "@src/components/genshin/party/list"
import { useCalc } from "@src/genshin/context"

export function PageEffects() {
  const [calc] = useCalc()
  const scenario = calc.Get().Scenario
  const current = scenario.Character

  return <div className="page-effects">
    <PartyList />
    {current && (
      <div className="p-1 grid gap-1 lg:grid-cols-2">
        <EffectList charbox={current} />
        <ExtraEffectsList charbox={current} />
      </div>
    )}
  </div>
}
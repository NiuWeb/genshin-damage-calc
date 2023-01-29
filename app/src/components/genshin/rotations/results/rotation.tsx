import { useCalc } from "@src/genshin/context"
import { genshin } from "@src/genshin/core"
import { RotationCharacterSummary } from "./character"
import { RotationGeneralSummary } from "./general"

export function RotationSummary({ data }: { data: genshin.rotation.Summary }) {

  const [calc] = useCalc()
  const character = calc.Get().Scenario.Character?.GetCharacter().Options.Name

  return <div className="rotation-summary overflow-hidden grid lg:grid-cols-2 gap-1">
    <RotationGeneralSummary data={data} />
    {character && data.characters[character] && <RotationCharacterSummary
      charname={character}
      data={data.characters[character]} />}
  </div>
}
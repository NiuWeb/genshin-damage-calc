import { ArtifactsAdd } from "@src/components/genshin/artifact/add"
import { ArtboxCard } from "@src/components/genshin/artbox/artbox"
import { PartyList } from "@src/components/genshin/party/list"
import { useCalc } from "@src/genshin/context"

export function PageArtifacts() {
  const [calc] = useCalc()
  const scenario = calc.Get().Scenario
  const character = scenario.Character
  const artifacts = character?.GetArtifacts()

  return <div className="page-artifacts">
    <PartyList />
    {character && (
      <div className="p-1">
        {artifacts ? (
          <ArtboxCard artbox={artifacts} />
        ) : (
          <ArtifactsAdd charbox={character} />
        )}
      </div>
    )}
  </div>
}
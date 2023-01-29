import { SetsCard } from "@src/components/genshin/artbox/sets"
import { CharacterCard } from "@src/components/genshin/character/card/character"
import { EnemyCard } from "@src/components/genshin/enemy/enemy"
import { InstancesCard } from "@src/components/genshin/instances/instances"
import { PartyList } from "@src/components/genshin/party/list"
import { WeaponCard } from "@src/components/genshin/weapon/weapon"
import { ScenarioGrid } from "@src/components/layout/scenario-grid"
import { useCalc } from "@src/genshin/context"

export function PageAttributes() {
  const [calc] = useCalc()
  const scenario = calc.Get().Scenario
  const character = scenario.Character
  const artbox = character?.GetArtifacts()

  return <div className="page-attributes">
    <PartyList />
    <ScenarioGrid className="p-1">
      {character && <>
        <div className="flex flex-col gap-1">
          <CharacterCard character={character.GetCharacter()} />
          <WeaponCard charbox={character} />
        </div>
        <div>
          <InstancesCard charbox={character} />
        </div>
        <div className="flex flex-col gap-1">
          {artbox && <SetsCard artbox={artbox} />}
          <EnemyCard enemy={character.GetCharacter().GetEnemy()} />
        </div>
      </>}
    </ScenarioGrid>
  </div>
}
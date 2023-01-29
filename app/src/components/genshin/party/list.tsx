import { ScenarioGrid } from "@src/components/layout/scenario-grid"
import { useCalc } from "@src/genshin/context"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { CharacterHeader } from "../character/card/header"
import { AddCharacterCard } from "../character/add/add-card"

export function PartyList({ hideAdd }: { hideAdd?: boolean }) {
  const [calc, exec] = useCalc()
  const scenario = calc.Get().Scenario
  const party = scenario.Party
  const members = party.GetMembers()
  const current = scenario.Character

  function change(member: genshin.charbox.Charbox) {
    exec(() => scenario.Character = member)
  }
  return <ScenarioGrid>
    {members.length === 0 && !hideAdd && <AddCharacterCard />}
    {members.map((member, i) => {
      const char = member.GetCharacter()
      const opts = char.Options

      return member === current ? (
        <CharacterHeader key={i} name={opts.Name} element={opts.Element} />
      ) : (
        <div
          key={i}

          onClick={() => change(member)}
          className="p-2 text-xl text-neutral-500 font-bold bg-slate-700/10 hover:bg-slate-700/20 hover:cursor-pointer">
          {GetString("ITEM." + opts.Name)}
        </div>
      )
    })}
    {0 < members.length && members.length < 4 && <AddCharacterCard small />}
  </ScenarioGrid>
}
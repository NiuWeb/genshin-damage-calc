import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { genshin } from "@src/genshin/core"
import { useCalc } from "@src/genshin/context"
import { Tooltip } from "@src/components/tooltip/tooltip"
import { GetString } from "@src/strings/strings"

const levels = Array.from(Array(15)).fill(0).map((_, i) => i + 1)

const Na = genshin.stats.stat.NORMAL_ATTACK_LEVEL
const Es = genshin.stats.stat.ELEMENTAL_SKILL_LEVEL
const Eb = genshin.stats.stat.ELEMENTAL_BURST_LEVEL
const Na_ = genshin.stats.stat.NORMAL_ATTACK_LEVEL_UP
const Es_ = genshin.stats.stat.ELEMENTAL_SKILL_LEVEL_UP
const Eb_ = genshin.stats.stat.ELEMENTAL_BURST_LEVEL_UP

const Min = 1
const Max = 12

export function TalentDropdown({ character }: {
  character: genshin.character.Character,
}) {
  return <div className="character-talents">
    <SingleTalent character={character} talent={Na} up={Na_} />
    <SingleTalent character={character} talent={Es} up={Es_} />
    <SingleTalent character={character} talent={Eb} up={Eb_} />
  </div>
}

function SingleTalent({ character, talent, up }: {
  character: genshin.character.Character,
  talent: number,
  up: number,
}) {
  const [, exec] = useCalc()
  function update([level]: number[]) {
    level = level || 1
    level = Math.max(Min + character.Get(up), Math.min(Max + character.Get(up), level))
    character.Set(talent, level)
    exec()
  }

  const valueUp = character.Get(up)

  const talentId = "character-talent-" + genshin.stats.stat.Name(talent) + "-" + character.Options.Name
  return <>
    <Dropdown
      notEmpty
      tooltip={talentId}
      className="character-talent min-w-[48px] bg-slate-600"
      title={valueUp === 0 ?
        character.Get(talent) :
        <span className="text-sky-300">
          {character.Get(talent)}
        </span>}
      values={[character.Get(talent)]}
      onChange={update}>
      {levels.map(level => (
        (level - valueUp > 0) && <DropdownItem
          key={level}
          value={level}>
          <div className="flex justify-between">
            <span>{level}</span>
            {valueUp > 0 && (
              <span>
                ({level - valueUp}
                <span className="text-sky-300"> +{valueUp}</span>
                )
              </span>
            )}
          </div>
        </DropdownItem>
      ))}
    </Dropdown>
    <Tooltip id={talentId}>
      {GetString("STAT." + genshin.stats.stat.Name(talent))}
    </Tooltip>
  </>
}
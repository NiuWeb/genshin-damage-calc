import { Checkbox } from "@src/components/checkbox/checkbox"
import { Modal } from "@src/components/modal/modal"
import { NumberField } from "@src/components/number-field/number-field"
import { useCalc } from "@src/genshin/context"
import { genshin } from "@src/genshin/core"
import { printStat } from "@src/genshin/utils/stat"
import { GetString } from "@src/strings/strings"
import { useState } from "react"
import { BasicStats } from "./stats/basic"
import { LevelInput } from "./level"
import { MoreStats } from "./stats/stats"
import { TalentDropdown } from "./talents"

const STATS = [
  genshin.stats.stat.CRIT_RATE,
  genshin.stats.stat.CRIT_DMG,
  genshin.stats.stat.ELEMENTAL_MASTERY,
  genshin.stats.stat.ENERGY_RECHARGE,
  genshin.stats.stat.PHYSICAL_DMG,
]

export function CharacterCard({ character }: {
  character: genshin.character.Character
}) {
  const [, exec] = useCalc()
  const stats = [...STATS, character.Options.Element]


  function changeHp(value: number) {
    value = Math.max(0, Math.min(1, value))
    exec(() => character.Set(genshin.stats.stat.HP_CURRENT, value))
  }
  function changeEnergy(value: number) {
    value = Math.max(0, Math.min(1, value))
    exec(() => character.Set(genshin.stats.stat.ENERGY_CURRENT, value))
  }

  function toggleShield() {
    exec(() => character.SetShield(!character.IsShielded()))
  }

  const [showMore, setMore] = useState(false)

  return <div className="character-attributes bg-slate-700">
    <div className="attributes-header px-2 py-1 text-xl font-bold bg-gray-800">
      {GetString("LABEL.ATTRIBUTES")}
    </div>
    <div className="p-1 flex flex-col gap-1">

      <div className="flex">
        <div className="grow">
          {GetString("STAT.LEVEL")}
        </div>
        <div>
          <LevelInput character={character} />
        </div>
      </div>

      <div className="flex">
        <div className="grow">
          {GetString("LABEL.TALENTS")}
        </div>
        <div>
          <TalentDropdown character={character} />
        </div>
      </div>

      <BasicStats character={character} />

      {stats.map((stat) => (
        <div key={stat} className="flex">
          <div className="grow">
            {GetString("STAT." + genshin.stats.stat.Name(stat))}
          </div>
          <div>
            {printStat(stat, character.Get(stat))}
          </div>
        </div>
      ))}

      <div className="flex">
        <div className="grow">
          {GetString("STAT.HP_CURRENT")}
        </div>
        <div>
          <NumberField
            className=" w-[36px] text-right bg-slate-600"
            percent
            onChange={changeHp}
            value={character.Get(genshin.stats.stat.HP_CURRENT)} />
        </div>
      </div>

      <div className="flex">
        <div className="grow">
          {GetString("STAT.ENERGY_CURRENT")}
        </div>
        <div>
          <NumberField
            className=" w-[36px] text-right bg-slate-600"
            percent
            onChange={changeEnergy}
            value={character.Get(genshin.stats.stat.ENERGY_CURRENT)} />
        </div>
      </div>

      <div className="flex">
        <div className="grow">
          {GetString("STAT.SHIELDED")}
        </div>
        <div>
          <Checkbox
            onChange={toggleShield}
            checked={character.IsShielded()} />
        </div>
      </div>

      <div className="flex justify-center text-sm">
        <button onClick={() => setMore(v => !v)}>
          {GetString("LABEL.STAT_MORE_SEE")}
        </button>
      </div>
    </div>

    <Modal full show={showMore} onClose={() => setMore(false)}>
      <MoreStats character={character} />
    </Modal>
  </div>
}
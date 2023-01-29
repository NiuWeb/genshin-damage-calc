import { Tooltip } from "@src/components/tooltip/tooltip"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { toPlaces } from "@src/utils/number"

const stats = [
  [genshin.stats.stat.ATK, genshin.stats.stat.ATK_BASE, genshin.stats.stat.ATK_PERCENT, genshin.stats.stat.ATK_FLAT],
  [genshin.stats.stat.HP, genshin.stats.stat.HP_BASE, genshin.stats.stat.HP_PERCENT, genshin.stats.stat.HP_FLAT],
  [genshin.stats.stat.DEF, genshin.stats.stat.DEF_BASE, genshin.stats.stat.DEF_PERCENT, genshin.stats.stat.DEF_FLAT],
]

export function BasicStats({ character }: { character: genshin.character.Character }) {
  const id = Math.random().toString(36)
  return <>
    {stats.map(([total, base, percent, flat], i) => (
      <div key={i} className="flex">
        <div className="grow">
          {GetString("STAT." + genshin.stats.stat.Name(total))}
        </div>
        <div>
          <pre className="inline-block mr-1 text-sm">
            <span data-tooltip={id + base}>{toPlaces(character.Get(base), 0)}</span>
            *(1+
            <span data-tooltip={id + percent} className=" text-cyan-300">
              {toPlaces(character.Get(percent) * 100, 2)}%
            </span>
            )+<span data-tooltip={id + flat} className="text-green-300">
              {toPlaces(character.Get(flat), 0)}
            </span>
          </pre>
          = {toPlaces(character.Get(total), 0)}
        </div>

        <Tooltip id={id + base}>
          {GetString("STAT." + genshin.stats.stat.Name(base))}
        </Tooltip>
        <Tooltip id={id + percent}>
          {GetString("STAT." + genshin.stats.stat.Name(percent))}
        </Tooltip>
        <Tooltip id={id + flat}>
          {GetString("STAT." + genshin.stats.stat.Name(flat))}
        </Tooltip>
      </div>
    ))}
  </>
}

import { genshin } from "@src/genshin/core"
import { printStat } from "@src/genshin/utils/stat"
import { GetString } from "@src/strings/strings"

export function ArtifactRolls({ artifact }: { artifact: genshin.artifact.Artifact }) {
  const data = artifact.FormatRolls()
  return <div className="artifact-rolls flex flex-col gap-1">
    {data.map(([stat, rolls], i) => (
      <div key={i} className="artifact-stat-rolls flex gap-1">
        <div className="stat grow">{GetString("STAT." + genshin.stats.stat.Name(stat))}</div>
        <div className="rolls flex gap-1">
          {rolls.map((roll, i) => (
            <div key={i} className="p-0.5 bg-neutral-600 w-[48px] text-right">
              {printStat(stat, roll, 1)}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
}
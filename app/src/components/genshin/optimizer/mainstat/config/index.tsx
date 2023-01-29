import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useMemo } from "react"
import { MainstatConfigProps } from "./type"

export function MainstatConfig(props: MainstatConfigProps) {
  return <div className="substats-config flex flex-col gap-1">
    {[genshin.stats.piece.SANDS, genshin.stats.piece.GOBLET, genshin.stats.piece.CIRCLET].map(piece => (
      <PieceConfig
        key={piece}
        piece={piece}
        values={props.config.mainstats?.[piece]}
        onChange={stats => {
          if (!props.config.mainstats) {
            props.config.mainstats = {}
          }
          props.config.mainstats[piece] = stats
          props.onChange?.(props.config)
        }} />
    ))}
  </div>
}

function PieceConfig({ piece, values: _values, onChange }: {
  piece: number,
  values?: number[],
  onChange?(values: number[]): void
}) {
  const values = _values || []

  const allStats = useMemo(() => genshin.stats.PieceToMainstats(piece), [piece])

  return <div className="flex gap-1">
    <div className="grow">
      {GetString("ARTIFACT." + genshin.stats.piece.Name(piece))}
    </div>
    <div>
      <Dropdown
        className="bg-slate-600"
        multiple
        title={values.length === 0 || values.length === allStats.length ? (
          GetString("LABEL.ALL")
        ) : "(" + values.length + ")"}
        onChange={onChange}
        values={values}>
        {allStats.map((stat) => (
          <DropdownItem key={stat} value={stat}>
            {GetString("STAT." + genshin.stats.stat.Name(stat))}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  </div>
}
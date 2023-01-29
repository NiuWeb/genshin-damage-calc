import { NumberField } from "@src/components/number-field/number-field"
import { GetString } from "@src/strings/strings"

export function SubstatsConfigTotal({ total, onChange }: { total: number, onChange?(total: number): void }) {
  return <div className="substats-total flex gap-1">
    <div className="grow">{GetString("LABEL.TOTAL")}</div>
    <div>
      <NumberField
        className="bg-slate-600 w-[32px] text-right"
        value={total}
        onChange={x => {
          total = Math.max(0, Math.min(45, x))
          onChange?.(total)
        }} />
    </div>
  </div>
}
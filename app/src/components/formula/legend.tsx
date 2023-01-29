import { classes } from "@src/utils/classes"
import { FormulaProps } from "./type"

export function FormulaLegend({ replace }: { replace: FormulaProps["replace"] }) {
  if (!replace) {
    return null
  }
  const entries = Object.entries(replace)

  return <div className="formula-legend grid md:grid-cols-2 gap-1 p-1">
    {entries.map(([, data], i) => data.legend && (
      <div key={i} className="legend-entry flex items-center gap-1">
        <div className="legend-color border border-black">
          <div
            style={data.style}
            className={classes("legend-color-inner w-[24px] h-[24px]", data.className)} />
        </div>
        <div className="legend-text">
          {data.legend}
        </div>
      </div>
    ))}
  </div>
}
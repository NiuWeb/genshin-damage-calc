import { SubstatsConfigContext, SubstatsConfigProps } from "./context"
import { FilterCard } from "./filter"
import { SubstatsConfigTable } from "./table"
import { SubstatsConfigTier } from "./tier"
import { SubstatsConfigTotal } from "./total"

export function SubstatsConfig(props: SubstatsConfigProps) {
  return <SubstatsConfigContext.Provider value={props}>
    <div className="substats-config flex flex-col gap-1">
      <SubstatsConfigTotal total={props.config.total} onChange={total => {
        props.config.total = total
        props.onChange?.(props.config)
      }} />
      <SubstatsConfigTier tier={props.config.tier} onChange={tier => {
        props.config.tier = tier
        props.onChange?.(props.config)
      }} />
      <div className="flex justify-center">
        <div className="inline-flex">
          <SubstatsConfigTable />
        </div>
      </div>
      <FilterCard
        filters={props.config.filter}
        onChange={(filter) => {
          props.config.filter = filter
          props.onChange?.(props.config)
        }} />
    </div>
  </SubstatsConfigContext.Provider>
}
import { FilterContext } from "./context"
import { FilterLevel } from "./level"
import { FilterMain } from "./main"
import { FilterPiece } from "./piece"
import { FilterStars } from "./stars"
import { FilterSubs } from "./subs"

export function ArtifactFilter(props: FilterContext) {
  return <FilterContext.Provider value={props}>
    <div className="artifact-filter flex gap-4 bg-slate-700 p-1">
      <FilterPiece />
      <FilterMain />
      <FilterLevel />
      <FilterStars />
      <FilterSubs />
    </div>
  </FilterContext.Provider>
}
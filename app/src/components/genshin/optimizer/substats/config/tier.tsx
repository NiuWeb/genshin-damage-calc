import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"

const tiers = [
  genshin.scaling.SubstatTier.ROLL_1,
  genshin.scaling.SubstatTier.ROLL_2,
  genshin.scaling.SubstatTier.ROLL_3,
  genshin.scaling.SubstatTier.ROLL_4,
  genshin.scaling.SubstatTier.ROLL_AVG,
]

export function SubstatsConfigTier({ tier, onChange }: {
  tier: genshin.scaling.SubstatTier
  onChange?(tier: genshin.scaling.SubstatTier): void
}) {
  function change([tier]: number[]) {
    if (!Number.isFinite(tier) || !tiers.includes(tier)) {
      return
    }
    onChange?.(tier)
  }

  return <div className="substats-tier flex gap-1">
    <div className="grow">{GetString("LABEL.TIER")}</div>
    <div className="text-right bg-slate-600">
      <Dropdown
        title={printTier(tier)}
        notEmpty
        onChange={change}
        values={[tier]}>
        {tiers.map(tier => (
          <DropdownItem key={tier} value={tier}>
            {printTier(tier)}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  </div>
}
const printTier = (tier: number) => tier === genshin.scaling.SubstatTier.ROLL_AVG ? (
  GetString("LABEL.AVERAGE")
) : (
  (tier + 1) + ""
)
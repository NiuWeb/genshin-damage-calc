import { SubstatsConfigTier } from "../../substats/config/tier"
import { NextRollConfigProps } from "./type"

export function NextRollConfig({ config, onChange }: NextRollConfigProps) {
  return <div className="nextroll-config flex flex-col gap-1">
    <SubstatsConfigTier tier={config.tier} onChange={tier => {
      config.tier = tier
      onChange?.(config)
    }} />
  </div>
}
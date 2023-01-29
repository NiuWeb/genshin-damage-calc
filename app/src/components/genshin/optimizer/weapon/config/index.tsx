import { MonacoEditor } from "@src/components/monaco/monaco"
import { genshin } from "@src/genshin/core"
import { WeaponRanks } from "./ranks"

export function WeaponConfig({ config, onChange }: {
  config: genshin.optimizer.weapon.BaseConfig
  onChange?(config: genshin.optimizer.weapon.BaseConfig): void
}) {
  return <div className="weapon-config flex flex-col gap-1">
    <div className="flex justify-center">
      <WeaponRanks config={config.Ranks} />
    </div>
    <div className="h-[640px]">
      <MonacoEditor
        path="/optimizer/weapon/config"
        language="genshin-cmd"
        theme="genshin-cmd-theme"
        value={config.ConfigCmd}
        onChange={value => {
          config.ConfigCmd = value
          onChange?.(config)
        }} />
    </div>
  </div>
}
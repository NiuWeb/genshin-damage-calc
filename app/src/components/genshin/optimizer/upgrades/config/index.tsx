import { MonacoEditor } from "@src/components/monaco/monaco"
import { genshin } from "@src/genshin/core"

export function UpgradesConfig({ config, onChange }: {
  config: genshin.optimizer.upgrades.BaseConfig
  onChange?(config: genshin.optimizer.upgrades.BaseConfig): void
}) {
  return <div className="general-config flex flex-col gap-1">
    <div className="h-[640px]">
      <MonacoEditor
        path="/optimizer/general/config"
        language="genshin-cmd-upgrades-optimizer"
        theme="genshin-cmd-theme"
        value={config.resourceCmd}
        onChange={value => {
          config.resourceCmd = value
          onChange?.(config)
        }} />
    </div>
  </div>
}
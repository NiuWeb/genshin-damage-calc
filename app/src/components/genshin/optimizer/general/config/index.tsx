import { MonacoEditor } from "@src/components/monaco/monaco"
import { genshin } from "@src/genshin/core"

export function GeneralConfig({ config, onChange }: {
  config: genshin.optimizer.general.BaseConfig
  onChange?(config: genshin.optimizer.general.BaseConfig): void
}) {
  return <div className="general-config flex flex-col gap-1">
    <div className="h-[640px]">
      <MonacoEditor
        path="/optimizer/general/config"
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
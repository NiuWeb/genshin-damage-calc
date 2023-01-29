import { MonacoEditor } from "@src/components/monaco/monaco"
import { genshin } from "@src/genshin/core"

export function SetConfig({ config, onChange }: {
  config: genshin.optimizer.set.BaseConfig
  onChange?(config: genshin.optimizer.set.BaseConfig): void
}) {

  return <div className="h-[640px]">
    <MonacoEditor
      path="/optimizer/set/config"
      language="genshin-cmd"
      theme="genshin-cmd-theme"
      value={config.ConfigCmd}
      onChange={value => {
        config.ConfigCmd = value
        onChange?.(config)
      }} />
  </div>
}
import { MonacoEditor } from "@src/components/monaco/monaco"
import { UpgradesConfigContext, UpgradesConfigProps } from "./context"
import { CriteriaConfig } from "./criteria"

export function UpgradesConfig({ config, onChange }: UpgradesConfigProps) {

  return <UpgradesConfigContext.Provider value={{ config, onChange }}>
    <div className="general-config flex flex-col gap-1">
      <div className="flex justify-center">
        <CriteriaConfig />
      </div>
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
  </UpgradesConfigContext.Provider>
}
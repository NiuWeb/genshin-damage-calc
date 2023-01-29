import { MonacoEditor } from "@src/components/monaco/monaco"
import { useContext } from "react"
import { ArtifactsConfigContext } from "./context"

export function Editor() {
  const { config, onChange } = useContext(ArtifactsConfigContext)
  return <div className="h-[640px]">
    <MonacoEditor
      path="/optimizer/artifacts/config"
      language="genshin-cmd"
      theme="genshin-cmd-theme"
      value={config.ConfigCmd}
      onChange={value => {
        config.ConfigCmd = value
        onChange?.(config)
      }} />
  </div>
}
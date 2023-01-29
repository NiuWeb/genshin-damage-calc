import { genshin } from "@src/genshin/core"
import { downloadFile } from "@src/genshin/utils/file"
import { GetString } from "@src/strings/strings"

export function ArtifactsExportButton({ artifacts }: { artifacts: readonly genshin.utils.ReadOnly<genshin.artifact.Exported>[] }) {

  function trigger() {
    const str = JSON.stringify(artifacts)
    downloadFile("artifacts.json", str)
  }

  return <button
    onClick={trigger}
    className="p-2 text-black bg-green-500 hover:bg-green-600 active:bg-green-700">
    {GetString("ACTION.EXPORT")}
  </button>
}
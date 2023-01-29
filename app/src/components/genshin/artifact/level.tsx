import { NumberField } from "@src/components/number-field/number-field"
import { useContext } from "react"
import { Plus } from "react-bootstrap-icons"
import { ArtifactContext } from "./context"

export function ArtifactLevel() {
  const { artifact, update, readonly } = useContext(ArtifactContext)

  function change(level: number) {
    if(readonly) {return}
    artifact.SetLevel(level)
    update()
  }

  return <div className="artifact-level flex items-stretch">
    <div className="bg-slate-600 flex items-center">
      <Plus />
    </div>
    <NumberField
      readonly={readonly}
      onChange={change}
      className="bg-slate-600 w-[20px] font-normal text-right"
      value={artifact.GetLevel()} />
  </div>
}
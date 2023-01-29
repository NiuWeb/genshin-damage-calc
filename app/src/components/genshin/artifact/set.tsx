import { useContext } from "react"
import { ArtifactContext } from "./context"
import { SetSelect } from "./set-select"


export function ArtifactSet() {
  const { artifact, update, readonly } = useContext(ArtifactContext)
  const set = artifact.GetSet()
  function change(newset: string) {
    if (set === newset || readonly) {
      return
    }
    artifact.SetSet(newset)
    update()
  }

  return <div className="artifact-set">
    <SetSelect disabled={readonly} set={set} onChange={change} />
  </div>
}
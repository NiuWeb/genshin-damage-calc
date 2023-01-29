import { AllowOnly } from "./allow-only"
import { AllowPieces } from "./allow-pieces"
import { ArtifactsConfigContext, ArtifactsConfigProps } from "./context"
import { Editor } from "./editor"
import { Filter } from "./filter"

export function ArtifactsConfig(props: ArtifactsConfigProps) {

  return <ArtifactsConfigContext.Provider value={props}>
    <div className="grid xl:grid-cols-2">
      <div>
        <AllowPieces />
        <AllowOnly />
      </div>
      <div>
        <Filter />
      </div>
    </div>
    <Editor />
  </ArtifactsConfigContext.Provider>
}
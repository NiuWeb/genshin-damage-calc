import { genshin } from "@src/genshin/core"
import { createContext } from "react"
export interface ArtifactProps {
  artifact: genshin.artifact.Artifact
  readonly?: boolean
  onChange?(): void
}
export interface ArtifactContext extends ArtifactProps {
  update(): void
}
export const ArtifactContext = createContext({} as ArtifactContext)
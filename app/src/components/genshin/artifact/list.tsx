import { genshin } from "@src/genshin/core"
import { ReactNode } from "react"
import { ArtifactCard } from "./artifact"

export function ArtifactList({ list, children, onChange }: {
  list: readonly genshin.artifact.Artifact[],
  children?: ReactNode
  onChange?(index: number): void
}) {
  return <div className="artifact-list grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-1">
    {list && list.map((art, i) => (
      <ArtifactCard
        onChange={() => onChange?.(i)}
        artifact={art}
        key={i} />
    ))}
    {children}
  </div>
}
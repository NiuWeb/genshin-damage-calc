import { genshin } from "@src/genshin/core"
import { useMemo } from "react"
import { ArtifactCard } from "../../artifact/artifact"
import { Remove } from "./remove"
import { StoredContext, StoredProps } from "./context"
import { Edit } from "./edit"
import { LockToggle } from "./lock"
import { classes } from "@src/utils/classes"

export function StoredArtifact(props: StoredProps) {
  const real = useMemo(() => {
    const art = new genshin.artifact.Artifact(props.artifact.piece)
    genshin.artifact.Import(props.artifact, art)
    return art
  }, [props.artifact])

  const context = { ...props, real }

  return <StoredContext.Provider value={context}>
    <div className={classes(
      "artifact-stored border border-transparent hover:border-white/50",
      real.Locked ? "opacity-60" : ""
    )}>
      <div className="toolbar p-1 bg-cyan-600 flex justify-between gap-1">
        <div className="flex gap-1">
          <LockToggle />
        </div>
        {!real.Locked && (
          <div className="flex gap-1">
            <Edit />
            <Remove />
          </div>
        )}
      </div>
      <ArtifactCard artifact={real} readonly />
    </div>
  </StoredContext.Provider>
}
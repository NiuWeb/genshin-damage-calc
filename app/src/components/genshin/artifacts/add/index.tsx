import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useEffect, useState } from "react"
import { ArtifactCard } from "../../artifact/artifact"

const pieces = genshin.stats.piece.Values()

export function ArtifactAddCard({ onChange }: { onChange(art: genshin.artifact.Artifact): void }) {
  const [artifact, setArtifact] = useState<genshin.artifact.Artifact | undefined>()

  useEffect(() => void change(), [artifact])

  function set(piece: number) {
    const art = new genshin.artifact.Artifact(piece)
    art.FillSubstats()
    setArtifact(art)
  }

  function change() {
    if (!artifact) {
      return
    }
    onChange(artifact)
  }

  return <div className="artifact-add">
    {artifact ? (
      <ArtifactCard artifact={artifact} onChange={change} />
    ) : (
      <div className="piece-select flex gap-1 justify-center">
        {pieces.map(piece => (
          <button
            key={piece}
            onClick={() => set(piece)}
            className="text-black p-1 bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700">
            {GetString("ARTIFACT." + genshin.stats.piece.Name(piece))}
          </button>
        ))}
      </div>
    )}
  </div>
}
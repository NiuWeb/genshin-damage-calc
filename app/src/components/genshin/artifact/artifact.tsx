import { genshin } from "@src/genshin/core"
import { Alert } from "@src/popup/alert"
import { GetString } from "@src/strings/strings"
import { useReducer } from "react"
import { ArtifactContext, ArtifactProps } from "./context"
import { ArtifactLevel } from "./level"
import { ArtifactRolls } from "./rolls"
import { ArtifactSet } from "./set"
import { ArtifactStars } from "./stars"
import { ArtifactStat } from "./stat"

export function ArtifactCard(props: ArtifactProps) {
  const [, update] = useReducer(x => (x + 1) % 5, 0)
  const context: ArtifactContext = {
    ...props,
    update() {
      update()
      props.onChange?.()
    },
  }

  function viewRolls() {
    Alert({
      title: GetString("ACTION.ARTIFACT_ROLLS_VIEW"),
      content: <ArtifactRolls artifact={props.artifact} />
    })
  }

  const substats = Array.from(Array(props.artifact.SubstatsLength())).fill(0)
  return <ArtifactContext.Provider value={context}>
    <div className="artifact">
      <div className="artifact-header p-1 bg-gray-800 font-bold flex justify-between">
        <div className="left">
          <ArtifactStars />
          {GetString("ARTIFACT." + genshin.stats.piece.Name(props.artifact.GetPiece()))}
        </div>
        <div className="right">
          <ArtifactLevel />
        </div>
      </div>
      <div className="artifact-body p-1 flex flex-col gap-0.5 bg-slate-700">
        <ArtifactSet />
        <ArtifactStat main index={0} />
        {substats.map((_, i) => (
          <ArtifactStat index={i} key={i} />
        ))}
        <button
          onClick={viewRolls}
          className="text-sm artifact-rolls-button p-0.5 flex justify-center hover:bg-black/10 active:bg-black/20">
          {GetString("ACTION.ARTIFACT_ROLLS_VIEW")}
        </button>
      </div>
    </div>
  </ArtifactContext.Provider>
}
import { Checkbox } from "@src/components/checkbox/checkbox"
import { GetString } from "@src/strings/strings"
import { useContext, useReducer } from "react"
import { ArtifactsConfigContext } from "./context"

const pieces = [0, 2, 4]

export function AllowPieces() {
  const { config, onChange } = useContext(ArtifactsConfigContext)
  const [, update] = useReducer(x => (x + 1) % 6, 0)

  function change() {
    onChange?.(config)
    update()
  }

  const allow = pieces.map(p => !!config.allowSetNumber?.includes(p))

  function toggle(piece: number) {
    if (piece !== 0 && piece !== 2 && piece !== 4) {
      return
    }
    if (!config.allowSetNumber) {
      config.allowSetNumber = [piece]
    } else {
      if (!config.allowSetNumber.includes(piece)) {
        config.allowSetNumber.push(piece)
      } else {
        config.allowSetNumber = config.allowSetNumber.filter(p => p !== piece)
      }
    }
    change()
  }

  return <div className="flex flex-col gap-1">
    {pieces.map((p, i) => (
      <div key={i} onClick={() => toggle(p)} className="item flex gap-1 items-center">
        <Checkbox checked={allow[i]} />
        {GetString("OPTIMIZER.ARTIFACTS_ALLOW_PIECE_" + p)}
      </div>
    ))}
  </div>
}
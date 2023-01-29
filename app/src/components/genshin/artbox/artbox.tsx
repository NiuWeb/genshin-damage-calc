import { genshin } from "@src/genshin/core"
import { Alert } from "@src/popup/alert"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { useReducer } from "react"
import { ArtifactList } from "../artifact/list"
import { SetsCard } from "./sets"
import { ArtboxSummary } from "./summary"

export function ArtboxCard({ artbox }: { artbox: genshin.artbox.Artbox }) {
  const [, update] = useReducer(x => (x + 1) % 7, 0)
  function open() {
    Alert({
      title: GetString("ACTION.ARTIFACT_ROLLS_SUMMARY"),
      content: <ArtboxSummary artbox={artbox} />
    })
  }

  return <ArtifactList
    onChange={update}
    list={artbox.GetArtifacts()}>
    <div className="artifact-sets-container">
      <SetsCard artbox={artbox} />
    </div>
    <div
      role="button"
      onClick={open}
      className={classes(
        "rolls-summary-view",
        " bg-slate-700 hover:bg-slate-700/50 active:bg-slate-800",
        "p-2 flex justify-center items-center text-lg"
      )}>
      {GetString("ACTION.ARTIFACT_ROLLS_SUMMARY_VIEW")}
    </div>
  </ArtifactList>
}
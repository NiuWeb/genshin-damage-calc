import { PartyList } from "@src/components/genshin/party/list"
import { RotationSummary } from "@src/components/genshin/rotations/results/rotation"
import { Markdown } from "@src/components/markdown/markdown"
import { useCalc } from "@src/genshin/context"
import { Alert } from "@src/popup/alert"
import { GetString } from "@src/strings/strings"
import { useNavigate } from "react-router"
import { RotationDetails } from "./details"

export function PageRotationResult() {
  const [calc] = useCalc()
  const navigate = useNavigate()
  const results = calc.Results.Rotation
  const summary = results?.summary
  const details = results?.details

  function showDetails() {
    if (!details) { return }
    Alert({
      title: GetString("ACTION.ROTATION_DETAIL_SHOW"),
      content: <RotationDetails details={details} />
    })
  }

  return <>
    <PartyList hideAdd />
    {summary && <RotationSummary data={summary} />}

    <div className="m-1 flex justify-center items-center flex-col gap-1">
      {results ? (
        <button
          onClick={showDetails}
          className="p-1 w-[420px] text-center bg-gray-600 hover:bg-gray-700 active:bg-gray-800">
          {GetString("ACTION.ROTATION_DETAIL_SHOW")}
        </button>
      ) : (
        <div className="p-1">
          {GetString("LABEL.RESULT_NONE")}
        </div>
      )}
      <div className="p-1 max-w-[420px] bg-slate-700 text-justify flex flex-col gap-1">
        <Markdown>{GetString("MSG.ALERT_ROTATION_NO_AUTO_UPDATE")}</Markdown>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/rotation/editor")}
            className="text-black bg-green-600 hover:bg-green-700 active:bg-green-800 p-1">
            {GetString("ACTION.EDITOR_GO")}
          </button>
        </div>
      </div>
    </div>
  </>
}
import { GetString } from "@src/strings/strings"
import { Github } from "react-bootstrap-icons"
import { Tooltip } from "../tooltip/tooltip"

const url = import.meta.env.VITE_GITHUB_URL

export function GithubButton() {
  return <a href={url} target="_blank">
    <button
      data-tooltip="github-button"
      className="github p-2 bg-black/80 hover:bg-black/90 active:bg-black text-white">
      <Github />
    </button>
    <Tooltip id="github-button">
      {GetString("LABEL.GITHUB")}
    </Tooltip>
  </a>
}
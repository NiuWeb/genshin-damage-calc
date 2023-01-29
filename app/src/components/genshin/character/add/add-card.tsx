import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { useState } from "react"
import { PlusSquareFill } from "react-bootstrap-icons"
import { AddCharacterModal } from "./add-modal"

export function AddCharacterCard({ small }: { small?: boolean }) {

  const [show, setShow] = useState(false)

  return <>
    <AddCharacterModal show={show} onClose={() => setShow(false)} />
    {small ?
      <div
        role="button"
        onClick={() => setShow(true)}
        className={classes(
          "party-add-character",
          "gap-2 flex justify-center items-center",
          "bg-gray-700 hover:bg-gray-700/50 active:bg-gray-700/25",
          "hover:cursor-pointer"
        )}>
        <PlusSquareFill size={24} />
        <span>{GetString("ACTION.CHARACTER_ADD")}</span>
      </div>
      :
      <div
        className={classes(
          "party-add-character",
          "h-100 flex justify-center items-center min-h-[420px]"
        )}>
        <button
          onClick={() => setShow(true)}
          className={classes(
            "gap-2 p-4 flex justify-center items-center flex-col",
            "bg-gray-700 hover:bg-gray-700/50 active:bg-gray-700/25"
          )}>
          <PlusSquareFill size={64} />
          <span>{GetString("ACTION.CHARACTER_ADD")}</span>
        </button>
      </div>}
  </>
}
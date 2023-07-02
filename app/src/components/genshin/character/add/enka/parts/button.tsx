import "./style.css"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { DetailedHTMLProps, ButtonHTMLAttributes } from "react"

export function ImportButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return <button
    {...props}
    className={classes(props.className, "import-button")}>
    {GetString("ACTION.IMPORT")}
  </button>
}
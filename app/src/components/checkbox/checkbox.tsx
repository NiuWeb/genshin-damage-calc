import { classes } from "@src/utils/classes"
import { CheckSquare, Square, } from "react-bootstrap-icons"

export function Checkbox({ checked, onChange, tooltip }: {
    checked?: boolean,
    onChange?(checked: boolean): void
    tooltip?: string
}) {
    function change() {
        onChange?.(!checked)
    }
    return <div
        tabIndex={0}
        role="checkbox"
        data-tooltip={tooltip}
        onClick={change}
        onKeyDown={ev => {
            if (ev.key === "Enter" || ev.key === " ") {
                change()
            }
        }}
        className={classes(
            "inline-block text-xl hover:cursor-pointer",
            checked ?
                "bg-green-500 hover:bg-green-600 active:bg-green-700" :
                "bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-500",

        )}>
        {checked ? (
            <CheckSquare />
        ) : (
            <Square />
        )}
    </div>
}
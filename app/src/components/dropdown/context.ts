import { createContext, useEffect, useState } from "react"
import { DropdownContextProps, DropdownProps } from "./type"
import { activateValue } from "./utils"

export const DropdownContext = createContext({} as DropdownContextProps)

export function useDropdownProvider(props: DropdownProps): DropdownContextProps {
    const active = props.values || []
    const [focus, setFocus] = useState<number | undefined>(undefined)
    const [search, setSearch] = useState<string>("")
    const [open, setOpen] = useState(false)
    const max = props.multiple ? (
        props.max || Infinity
    ) : 1

    function setActive(fn: (values: number[]) => number[]) {
        props.onChange?.(fn(active))
    }

    useEffect(() => {
        setSearch("")
    }, [open])

    return {
        isOpen: open,
        search,
        setSearch,
        multiple: !!props.multiple,
        focused: focus,

        activate(value) {
            setActive(values => activateValue(value, values, max))
        },
        deactivate(value) {
            if (props.notEmpty && active.length <= 1) {
                return
            }
            setActive(values => values.filter(s => s !== value))
        },
        isActive(value) {
            return active.includes(value)
        },
        toggle(value) {
            if (this.isActive(value)) {
                this.deactivate(value)
            } else {
                this.activate(value)
            }
        },
        open() {
            setOpen(true)
        },
        close() {
            setOpen(false)
        },
        focus(value) {
            setFocus(value)
        },
        unfocus() {
            setFocus(undefined)
        },
    }
}
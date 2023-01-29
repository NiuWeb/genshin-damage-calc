import { ReactNode } from "react"

/** dropdown item */
export interface DropdownItemProps {
    /** children to render in the item box */
    children: ReactNode
    /** numeric value of the item */
    value: number
    /** tooltip id */
    tooltip?: string
}
/** dropdown properties */
export interface DropdownProps {
    /** hide the search bar */
    hideSearch?: boolean
    /** css classnames of the dropdown button */
    className?: string
    /** dropdown children */
    children?: ReactNode
    /** dropdown is disabled */
    disabled?: boolean
    /** dropdown element to render as title */
    title?: ReactNode
    /** dropdown numeric values */
    values?: number[]
    /** triggers when the items are selected/unselected */
    onChange?(values: number[]): void
    /** whether to accept multiple item selection */
    multiple?: boolean
    /** maximum multiple item selection */
    max?: number
    /** accept at least 1 active item */
    notEmpty?: boolean
    /**tooltip id */
    tooltip?: string
}

/** context to control dropdown from children items */
export interface DropdownContextProps {
    /** dropdown search string */
    readonly search: string
    /** is dropdown open? */
    readonly isOpen: boolean
    /** is the dropdown multiple */
    readonly multiple: boolean
    /** focused values */
    readonly focused: number | undefined
    /** sets the dropdown search string */
    setSearch(search: string): void
    /** checks if the given value is active */
    isActive(value: number): boolean
    /** activates the given value */
    activate(value: number): void
    /** deactivates the given value */
    deactivate(value: number): void
    /** toggles the given value */
    toggle(value: number): void
    /** opens the dropdown */
    open(): void
    /** closes the dropdown */
    close(): void
    /** focus an option */
    focus(value: number): void
    /** unfocus an option */
    unfocus(): void
}
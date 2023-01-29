import { classes } from "@src/utils/classes"
import { toPlaces } from "@src/utils/number"
import { useEffect, useRef, useState } from "react"

export interface NumberField {
  /** Current field value */
  value: number
  /** Triggers when value changes */
  onChange?(value: number): void
  /** decimal places to display. Default 2 */
  places?: number
  /** use value as a percentage or not. Default false */
  percent?: boolean
  /** input classnames */
  className?: string
  /** container div classnames */
  divClassName?: string
  /** tooltip id */
  tooltip?: string
  /** is input readonly? */
  readonly?: boolean
}

export function NumberField(_props: NumberField) {
  const props = {
    places: 2,
    ..._props
  }
  const [strval, setStrval] = useState(toPlaces(props.value, props.places))
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current !== document.activeElement) {
      refresh()
    }
  }, [props.value, props.places, props.percent])

  function update(strval: string) {
    if (props.readonly) { return }
    setStrval(strval)
    let got = parseFloat(strval) || 0
    if (props.percent) {
      got /= 100
    }
    props.onChange?.(got)
  }
  function refresh() {
    let got = props.value
    if (props.percent) {
      got *= 100
    }
    setStrval(toPlaces(got, props.places))
  }

  return <div className={classes("inline-flex items-stretch", props.divClassName)} data-tooltip={props.tooltip}>
    <input
      ref={ref}
      type="text"
      value={strval}
      className={props.className}
      readOnly={props.readonly}
      onChange={ev => update(ev.target.value)}
      onBlur={refresh}
      onKeyDown={ev => {
        if (ev.key === "Enter") {
          refresh()
        }
      }} />
    {props.percent && (
      <div
        className="flex items-center text-center px-0.5 bg-slate-600 select-none">
        %
      </div>
    )}
  </div>
}
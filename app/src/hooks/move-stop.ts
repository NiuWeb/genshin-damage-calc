import { useEffect, useMemo } from "react"

const events = new Map<string, (ev: MouseEvent) => void>()
const trigger = (e: MouseEvent) => {
    for (const ev of events.values()) {
        ev(e)
    }
}

let moveStopTimer = -1
window.addEventListener("mousemove", (ev) => {
    window.clearTimeout(moveStopTimer)
    moveStopTimer = window.setTimeout(() => trigger(ev), 100)
})

/**
 * Triggers a function when the mouse stops moving at any part of the window
 * @param callback Function to triggers
 */
export function useMouseMoveStop(callback: (ev: MouseEvent) => void) {
    const id = useMemo(() => Math.random().toString(36), [])
    useEffect(() => {
        events.set(id, callback)
        return () => {
            events.delete(id)
        }
    }, [callback, id])
}
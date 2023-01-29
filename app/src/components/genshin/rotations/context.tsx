import { getRotations } from "@src/api/rotations/get"
import { RotationContent } from "@src/api/rotations/parse"
import { createContext, useEffect, useState } from "react"

export interface RotationsContext {
  online: RotationContent[]
}

export const RotationsContext = createContext({} as RotationsContext)

export function useRotationsProvider(): RotationsContext {
  const [online, setOnline] = useState<RotationsContext["online"]>([])

  useEffect(() => {
    getRotations().then(result => setOnline(result))
  }, [])

  return {
    online,
  }
}
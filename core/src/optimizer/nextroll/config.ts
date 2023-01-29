import { scaling } from "@src/core"
import { BaseConfig } from "./type"

export const defaultConfig = (): BaseConfig => ({
  tier: scaling.SubstatTier.ROLL_AVG,
})
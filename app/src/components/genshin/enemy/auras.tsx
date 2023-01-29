import { useCalc } from "@src/genshin/context"
import { genshin } from "@src/genshin/core"
import { AuraSelect } from "../auras/select"

export function EnemyAuras({ enemy }: { enemy: genshin.enemy.Enemy }) {
  const [, exec] = useCalc()
  function change(auras: readonly number[]) {
    enemy.SetAuras(...auras)
    exec()
  }
  return <AuraSelect
    onChange={change}
    auras={enemy.GetAuras()} />
}
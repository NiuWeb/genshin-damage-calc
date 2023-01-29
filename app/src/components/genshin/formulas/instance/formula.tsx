import { Formula } from "@src/components/formula/formula"
import { genshin } from "@src/genshin/core"
import { getInstanceExpr } from "./expr"
import { getInstanceReplace } from "./replace"

export function InstanceFormula({ instance, type }: {
  instance: genshin.instance.Instance,
  type: genshin.formula.CritType
}) {
  const { stats, options } = instance.Params(true, type)
  const expr = getInstanceExpr(instance, stats, options)
  const replace = getInstanceReplace(instance, stats)

  return <Formula expr={expr} replace={replace} />
}
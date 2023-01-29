import { ElementTextColor } from "@src/genshin/utils/colors"
import { genshin } from "@src/genshin/core"
import { GetInstanceName } from "@src/genshin/utils/strings"
import { Alert } from "@src/popup/alert"
import { classes } from "@src/utils/classes"
import { ActionDelayer } from "@src/utils/delay"
import { toPlaces } from "@src/utils/number"
import { useEffect, useState } from "react"
import { Search } from "react-bootstrap-icons"
import { InstanceCard } from "./instance"

export function InstanceRows({ instances, type }: {
  instances: readonly genshin.instance.Instance[]
  type: genshin.formula.CritType
}) {
  function open(instance: genshin.instance.Instance) {
    Alert({
      title: GetInstanceName(instance.Character.Options.Name, instance.Options.Name),
      content: <InstanceCard instance={instance} type={type} />
    })
  }

  return <tbody>
    {instances.map((instance, i) => (
      <tr key={i}>
        <td>
          <button onClick={() => open(instance)} className="p-1 mr-1 text-xs hover:bg-black/25 active:bg-black/50">
            <Search />
          </button>
          <span className="text-sm">
            {GetInstanceName(instance.Character.Options.Name, instance.Options.Name)}
          </span>
        </td>
        <td className={classes("text-right", ElementTextColor(instance.GetElement()))}>
          <Damage instance={instance} type={type} />
        </td>
      </tr>
    ))}
  </tbody>
}

function Damage({ instance, type }: { instance: genshin.instance.Instance, type: genshin.formula.CritType }) {
  const [value, setValue] = useState(0)
  const [delayer, setDelayer] = useState<ActionDelayer<[], number> | undefined>(undefined)

  useEffect(() => {
    if (delayer) {
      delayer.kill()
    }
    setDelayer(new ActionDelayer(500, () => calculate(type, instance)))
    setValue(calculate(type, instance))

  }, [type, instance])

  useEffect(() => {
    if (!delayer) { return }

    delayer.onReturn = (v) => {
      if (v !== value)
        setValue(v)
    }
    delayer.call()
  })

  return <>{toPlaces(value, 0)}</>
}

function calculate(type: genshin.formula.CritType, instance: genshin.instance.Instance): number {
  switch (type) {
    case genshin.formula.CritType.NO_CRIT:
      return instance.DmgNoCrit(true)
    case genshin.formula.CritType.CRIT:
      return instance.DmgCrit(true)
    case genshin.formula.CritType.CRIT_AVG:
      return instance.DmgAvg(true)
  }
}
import { Formula } from "@src/components/formula/formula"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { toPlaces } from "@src/utils/number"

const EXPR_COMPLETE = `
E &= noaura_noreaction   * (1-aura)*(1-(reaction/aura))
  &+ noaura_yesreaction  * (1-aura)*(reaction/aura)
  &+ yesaura_noreaction  * (aura)  *(1-(reaction/aura))
  &+ yesaura_yesreaction * (aura)  *(reaction/aura) 
  &=  _E

damage = multiplier*(_E) = _damage
`
const EXPR_INCOMPLETE = `
single_damage = noaura_noreaction
damage = multiplier*(single_damage)
`

const keys = ["noaura_noreaction", "noaura_yesreaction", "yesaura_noreaction", "yesaura_yesreaction"] as const
const bgs = ["bg-lime-300", "bg-cyan-300", "bg-indigo-300", "bg-pink-300"]

function props(reg: genshin.rotation.Register, index: number) {
  return {
    value: toPlaces(reg[keys[index]], 0),
    className: classes("px-0.5 text-black", bgs[index]),
    legend: GetString("LABEL.DAMAGE_" + keys[index].toUpperCase())
  }
}

export function RotationFormula({ register }: { register: genshin.rotation.Register }) {
  const expr = register.aura === 0 ? EXPR_INCOMPLETE : EXPR_COMPLETE

  return <Formula
    replace={{
      damage: { value: GetString("LABEL.DAMAGE"), className: "p-1" },
      _damage: { value: toPlaces(register.damage, 0) },
      E: { value: GetString("LABEL.EXPECTED_VALUE"), className: "p-1" },
      _E: { value: toPlaces(register.single_damage, 0) },
      aura: {
        value: toPlaces(register.aura * 100, 2) + "%",
        className: "px-0.5 bg-blue-500 text-black",
        legend: GetString("LABEL.ROTATION_AURA_UPTIME")
      },
      reaction: {
        value: toPlaces(register.reaction * 100, 2) + "%",
        className: "px-0.5 bg-green-500 text-black",
        legend: GetString("LABEL.ROTATION_REACTION_UPTIME")
      },
      multiplier: {
        value: toPlaces(register.multiplier, 2),
        className: "px-0.5 bg-white text-black",
        legend: GetString("LABEL.ROTATION_MULTIPLIER")
      },
      [keys[0]]: props(register, 0),
      [keys[1]]: props(register, 1),
      [keys[2]]: props(register, 2),
      [keys[3]]: props(register, 3),
    }}
    expr={expr} />
}
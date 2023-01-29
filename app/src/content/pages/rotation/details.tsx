import { ElementBgColor } from "@src/genshin/utils/colors"
import { genshin } from "@src/genshin/core"
import { GetInstanceName } from "@src/genshin/utils/strings"
import { Alert } from "@src/popup/alert"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { toPlaces } from "@src/utils/number"
import { RegisterDetails } from "./reg-details"

export function RotationDetails({ details }: { details: genshin.rotation.Details }) {
  const characters = Object.keys(details)
  const maxitems = Object
    .values(details)
    .map(arr => arr.length)
    .reduce((a, b) => Math.max(a, b), 0)

  const indexes = Array.from(Array(maxitems)).fill(0).map((_, i) => i)

  return <div className="rotation-details min-w-[640px]">
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-collapse">
          {characters.map((char, i) => (
            <th key={i} className="border-collapse">{GetString("ITEM." + char)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {indexes.map(i => (
          <tr key={i} className="border-collapse">
            {characters.map((char, j) => {
              const reg = details[char][i]
              return <td key={j} className="border-collapse border border-neutral-900">
                {reg && <Register register={reg} />}
              </td>
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}

function Register({ register }: { register: genshin.rotation.Register }) {

  function details() {
    Alert({
      title: GetString("LABEL.DAMAGE_FORMULA"),
      content: <RegisterDetails register={register} />
    })
  }

  return <div className={classes("register text-black", ElementBgColor(register.element))}>
    <div onClick={details} className="hoverable flex gap-1 p-1 hover:bg-black/20 active:bg-black/40 hover:cursor-pointer">
      <div className=" bg-white text-black border border-black">
        x{toPlaces(register.multiplier, 2)}
      </div>
      <div className="grow">
        {GetInstanceName(register.charname, register.hitname)}
      </div>
      <div className=" bg-white text-black border border-black">
        {toPlaces(register.damage, 0)}
      </div>
    </div>
  </div>
}
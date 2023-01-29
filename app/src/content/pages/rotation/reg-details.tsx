import { RotationFormula } from "@src/components/genshin/formulas/rotation/formula"
import { ElementBgColor } from "@src/genshin/utils/colors"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"

export function RegisterDetails({ register }: { register: genshin.rotation.Register }) {
  return <div className="register-details">
    <div className="flex flex-col justify-center">
      <table className="w-full">
        <tbody>
          <tr>
            <td>{GetString("LABEL.NAME")}</td>
            <td className="text-right">
              <code className="bg-black/50 p-0.5">{register.hitname}</code>
            </td>
          </tr>
          <tr>
            <td>{GetString("LABEL.ELEMENT")}</td>
            <td className="text-right">
              <div className={classes("text-black inline-block px-0.5", ElementBgColor(register.element))}>
                {GetString("STAT." + genshin.stats.stat.Name(register.element))}
              </div>
            </td>
          </tr>
          <tr>
            <td>{GetString("LABEL.TALENT")}</td>
            <td className="text-right">
              {GetString("STAT." + genshin.stats.stat.Name(register.talent))}
            </td>
          </tr>
          <tr>
            <td>{GetString("LABEL.ENEMY_AURA")}</td>
            <td className="text-right">
              <div className="inline-flex gap-1 text-black">
                {register.auras.map((aura, i) => (
                  <div key={i} className={classes(ElementBgColor(genshin.stats.AuraToDmg(aura)))}>
                    {GetString("AURA." + genshin.stats.aura.Name(aura))}
                  </div>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <RotationFormula register={register} />
  </div>
}
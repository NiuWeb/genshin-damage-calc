import { PieChart } from "@src/components/charts/pie/pie"
import { ElementHexColor } from "@src/genshin/utils/colors"
import { genshin } from "@src/genshin/core"
import { GetInstanceName } from "@src/genshin/utils/strings"
import { GetString } from "@src/strings/strings"
import { toPlaces } from "@src/utils/number"

export function RotationCharacterSummary({ charname, data }: { charname: string, data: genshin.rotation.CharacterSummary }) {
    return <div className="character-summary flex flex-col bg-black/25">
        <div className="p-1 text-xl font-bold bg-gray-800 flex justify-center gap-2">
            <div>{GetString("LABEL.DAMAGE_CHARACTER")}</div>
            <div className=" bg-yellow-500 text-black">
                {toPlaces(data.damage, 0)}
            </div>
            <div className=" bg-neutral-400 text-black">
                {toPlaces(data.relative * 100, 2)}%
            </div>
        </div>
        <div className="grid lg:grid-cols-2">
            <PieChart
                data={data.elements}
                value={(_, { damage }) => damage}
                label={label => GetString("STAT." + genshin.stats.stat.Name(parseInt(label)))}
                color={label => ElementHexColor(parseInt(label))}
                tooltip={(_, { damage, relative }) => (
                    toPlaces(damage, 2) + " (" + toPlaces(relative * 100, 2) + "%)"
                )}
                foreColor="#ffffff"
            />
            <PieChart
                data={data.talents}
                value={(_, { damage }) => damage}
                label={label => GetString("STAT." + genshin.stats.stat.Name(parseInt(label)))}
                tooltip={(_, { damage, relative }) => (
                    toPlaces(damage, 2) + " (" + toPlaces(relative * 100, 2) + "%)"
                )}
                foreColor="#ffffff"
            />
            <PieChart
                data={data.instances}
                value={(_, { damage }) => damage}
                label={label => GetInstanceName(charname, label)}
                tooltip={(_, { damage, relative }) => (
                    toPlaces(damage, 2) + " (" + toPlaces(relative * 100, 2) + "%)"
                )}
                foreColor="#ffffff"
            />
        </div>
    </div>
}
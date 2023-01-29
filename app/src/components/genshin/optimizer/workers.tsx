import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { useCalc } from "@src/genshin/context"
import { GetString } from "@src/strings/strings"

const threads = navigator.hardwareConcurrency || 4
const arr = Array.from(Array(threads)).fill(0).map((_, i) => i + 1)

export function WorkersSelect() {
    const [calc, exec] = useCalc()

    function change([threads]: number[]) {
        if (!threads) { return }
        exec((calc) => calc.Config.Workers = threads)
    }

    return <div className="inline-flex items-center bg-green-600">
        <div className="px-0.5">{GetString("LABEL.WORKERS")}</div>
        <Dropdown
            notEmpty
            className="bg-green-700 px-1"
            onChange={change}
            title={calc.Config.Workers}
            values={[calc.Config.Workers]}>
            {arr.map(i => (
                <DropdownItem key={i} value={i}>
                    {i}
                </DropdownItem>
            ))}
        </Dropdown>
    </div>
}
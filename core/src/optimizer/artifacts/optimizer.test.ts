import { stats } from "@src/core"
import { _testlist } from "./list"
import { ArtifactsOptimizer } from "./optimizer"

describe("Generate combinations", () => {
    const optimizer = new ArtifactsOptimizer()
    optimizer.Init({ artifacts: _testlist })
    test("Combinations counted correctly", () => (
        expect(optimizer.GetTotal()).toBe(59 * 51 * 66 * 45 * 50)
    ))
})
describe("Generate combinations without sands", () => {
    const optimizer = new ArtifactsOptimizer()
    optimizer.Init({ artifacts: _testlist.filter(s => s.piece !== stats.piece.SANDS) })
    test("Combinations counted correctly", () => (
        expect(optimizer.GetTotal()).toBe(59 * 51 * 1 * 45 * 50)
    ))
})
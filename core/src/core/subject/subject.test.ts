import { Subject } from "./subject"

describe("Subject operations", () => {
    test("Prop changes correctly", () => {
        const subject = new Subject(3, "test")
        let want = 1.355
        subject.Set(0, want)
        let got = subject.Get(0)

        expect(got).toBeCloseTo(want, 6)

        want = -165
        subject.Set(2, want)
        got = subject.Get(2)

        expect(got).toBeCloseTo(want, 6)
    })

    test("Observers are triggered correctly", () => {
        const subject = new Subject(3, "test")
        let counter = 0

        const o = subject.CreateObserver(1, () => {
            counter++
        })

        subject.Notify(1) // 1
        subject.Notify(2)
        subject.Notify(1) // 2
        o.Disable()
        subject.Notify(1) // 2
        subject.Notify(1) // 2
        o.Enable()
        subject.Notify(1) // 3
        o.Remove()
        subject.Notify(1) // 3

        const want = 3

        expect(counter).toBe(want)
    })

    test("Modifiers are applied correctly", () => {
        const subject = new Subject(3, "test")
        const mod = subject.CreateModifier(0, 35)

        subject.CreateModifier(0, 20)

        let want = 55
        let got = subject.Get(0)
        expect(got).toBeCloseTo(want, 6)

        mod.Disable()

        want = 20
        got = subject.Get(0)
        expect(got).toBeCloseTo(want, 6)

        mod.Enable()
        mod.SetProp(1)

        want = 20
        got = subject.Get(0)
        expect(got).toBeCloseTo(want, 6)

        want = 35
        got = subject.Get(1)
        expect(got).toBeCloseTo(want, 6)
    })
})
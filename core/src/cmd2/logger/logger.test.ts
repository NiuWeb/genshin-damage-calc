import { Logger } from "./logger"

describe("Log messages", () => {
    const log = new Logger()
    log.Colorize = false
    log.Log("my man")
    log.Line = 2
    log.Warnf("two warnings: %d and %d", 1, 2)


    test("saved log string is correct", () => (
        expect(log.String()).toBe("[Line 1] [Log] my man\n[Line 2] [Warn] two warnings: 1 and 2")
    ))
})
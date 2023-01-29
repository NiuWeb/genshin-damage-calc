/*
 * A simple Express app to serve the rotation files in development
 */

const express = require("express")
const fs = require("fs")
const path = require("path")
const cors = require('cors')

async function* _walk(dir) {
    for await (const d of await fs.promises.opendir(dir)) {
        const entry = path.join(dir, d.name)
        if (d.isDirectory()) yield* _walk(entry)
        else if (d.isFile()) yield entry
    }
}
async function walk(dir) {
    const result = []
    for await (const p of _walk(dir))
        result.push(p)
    return result
}

const app = express()
const port = 3333

app.use(cors())
app.get("/", async (req, res) => {
    const { protocol } = req
    const hostname = req.headers["x-forwarded-host"] || req.headers["host"]

    const files = await walk(__dirname + "/content")

    files.forEach((path, i) => (
        files[i] = protocol + "://" + hostname + path.replace(__dirname, "")
    ))

    res.set("Content-Type", "application/json")
    res.end(JSON.stringify(files))
})
app.use("/content", express.static("content"))

app.listen(port, () => {
    console.log(`Rotations devserver running on port ${port}`)
})
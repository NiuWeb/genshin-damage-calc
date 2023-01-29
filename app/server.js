import express from "express"
import { config } from "dotenv"
const app = express()
const port = 3000
config()

const { BASE_PATH } = process.env
app.listen(port, () => {
  console.log(`Server "${BASE_PATH}" listening on port ${port}`)
})

app.use(BASE_PATH, express.static("dist"))

import { defineConfig } from "vite"
import { config } from "dotenv"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import monacoEditorPlugin from "vite-plugin-monaco-editor"

config()

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.BASE_PATH,
  server: {
    fs: {
      strict: false
    }
  },
  plugins: [
    react(),
    tsconfigPaths(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    monacoEditorPlugin.default({}),
  ]
})

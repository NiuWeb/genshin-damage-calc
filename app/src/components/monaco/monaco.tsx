import * as monaco from "monaco-editor"
import { useEffect, useRef, useState } from "react"
import "./index.css"

export interface MonacoEditor {
  path: string
  value?: string
  theme?: string
  tabSize?: number
  language?: string
  readonly?: boolean
  onChange?(content: string): void
}

export function getOrCreateModel(path: string, value: string, language?: string) {
  const uri = monaco.Uri.parse(path)
  const existing = monaco.editor.getModel(uri)
  if (existing) { return existing }
  const created = monaco.editor.createModel(value, language, uri)
  return created
}

export function MonacoEditor(props: MonacoEditor) {
  const ref = useRef<HTMLDivElement>(null)
  const [model, setModel] = useState<monaco.editor.ITextModel | undefined>(undefined)
  useEffect(() => {
    if (!ref.current) { return }
    const div = ref.current

    const model = getOrCreateModel(props.path, props.value || "", props.language)
    setModel(model)
    model.setValue(props.value || "")
    model.onDidChangeContent(() => {
      props.onChange?.(model.getValue())
    })

    const editor = monaco.editor.create(div, {
      model,
      theme: props.theme,
      readOnly: props.readonly,
      tabSize: props.tabSize || 2
    })

    return () => {
      editor.dispose()
      model.dispose()
    }
  }, [])

  useEffect(() => {
    if (!model) { return }
    model.setValue(props.value || "")
  }, [props.value])

  return <div ref={ref} className="h-full" />
}


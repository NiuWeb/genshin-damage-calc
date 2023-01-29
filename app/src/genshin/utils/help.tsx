import { Code } from "@src/components/console/code"
import { Markdown } from "@src/components/markdown/markdown"
import { useMemo } from "react"

export function HelpComponent({ help: _help }: { help: string }) {
  const help = useMemo(() => {
    return _help
      .replace(/\[line \d+\] \[(ok|error|warn)\]/ig, "")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
  }, [_help])

  return <div className="help">
    <Markdown components={{
      p: p => <p {...p} />,
      code: p => <Code>{p.children}</Code>,
      h3: p => <h3 {...p} className="text-lg mt-5 first:m-0 border-t first:border-0 border-neutral-900" />,
      ul: p => <ul {...p} className="ml-2" />,
      li: p => <li {...p} className="ml-4 list-disc" />
    }}>
      {help}
    </Markdown>
  </div>
}
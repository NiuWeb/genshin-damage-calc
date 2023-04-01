import { FetchGithubLatest, GithubLatest as IContent } from "@src/api/latest"
import { Markdown } from "@src/components/markdown/markdown"
import { Modal } from "@src/components/modal/modal"
import { ModalBody, ModalFooter, ModalHeader } from "@src/components/modal/parts"
import { GetString } from "@src/strings/strings"
import { useEffect, useState } from "react"
import { Github } from "react-bootstrap-icons"
import "./style.css"

const releasesUrl = import.meta.env.VITE_GITHUB_RELEASES_URL

export function GithubLatest() {
  const [content, setContent] = useState<IContent[] | undefined>(undefined)
  useEffect(() => {
    FetchGithubLatest().then(content => {
      if (!content) { return }
      setContent(content.slice(0, 3))
    })
  }, [])


  return content ? (
    <Modal show onClose={() => setContent(undefined)}>
      <ModalHeader>
        {GetString("LABEL.CHANGELOG")}
      </ModalHeader>
      <ModalBody>
        {content.map((content, i) => (
          <div key={i} className="md-document">
            <h2 className="text-lg my-1 font-bold">
              {content.name} ({new Date(content.published_at).toUTCString()})
            </h2>
            <Markdown linebreak>
              {content.body}
            </Markdown>
          </div>
        ))}
      </ModalBody>
      <ModalFooter>
        <a target="_blank" href={releasesUrl}>
          <div
            role="button"
            className="github inline-flex p-2 bg-black/80 hover:bg-black/90 active:bg-black text-white gap-1 items-center">
            <Github />
            {GetString("LABEL.GITHUB")}
          </div>
        </a>
      </ModalFooter>
    </Modal>
  ) : null
}
const ApiUrl = import.meta.env.VITE_GITHUB_LATEST_URL

export interface GithubLatest {
    name: string
    html_url: string
    published_at: string
    body: string
}

export async function FetchGithubLatest(): Promise<GithubLatest | undefined> {
    try {
        const req = await fetch(ApiUrl)
        const json = await req.json()
        return json
    } catch (e) {
        console.error(e)
        return undefined
    }
}
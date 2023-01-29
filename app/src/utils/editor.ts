import { StorageLoad, StorageSave } from "@src/storage/storage"

export class CodeEditor {
    constructor(public readonly Title: string) {
        this.storageKey = "code_editor_" + Title
        try {
            const json = JSON.parse(StorageLoad(this.storageKey))
            for (const fname in json) {
                this.files[fname] = String(json[fname]).valueOf()
            }
        } catch (e) {
            console.error("Could not load code editor: ", e)
        }
    }
    private files: { [filename: string]: string } = {}
    private readonly storageKey: string

    GetFile(filename: string): string {
        return this.files[filename] || ""
    }

    SetFile(filename: string, content: string | undefined): CodeEditor {
        this.files[filename] = content || ""
        const json = JSON.stringify(this.files)
        StorageSave(this.storageKey, json)
        return this
    }
}
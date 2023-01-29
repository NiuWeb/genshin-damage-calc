import { genshin } from "../core"

export class CalcProjects {

    constructor(private readonly onChange: (party: genshin.charbox.Party) => void) { }

    private readonly projects = new Map<string, genshin.charbox.Party>()
    private readonly names: string[] = []
    private current?: genshin.charbox.Party

    /** List the open project names */
    List(): readonly string[] {
        return this.names
    }

    /** renames a project */
    Rename(oldName: string, newName: string): boolean {
        oldName = oldName.trim()
        newName = newName.trim()

        if (oldName === newName) {
            return true
        }

        const index = this.names.indexOf(oldName)
        const party = this.projects.get(oldName)

        if (index === -1 || !party || this.Has(newName)) {
            return false
        }

        this.projects.delete(oldName)
        this.projects.set(newName, party)
        this.names.splice(index, 1, newName)
        return true
    }

    /** checks if a project name is open */
    Has(name: string) {
        return this.projects.has(name)
    }

    /** Sets the current project by its name */
    Set(name: string) {
        const party = this.projects.get(name)
        if (!party) {
            throw new Error("Cannot find project named: " + name)
        }
        this.current = party
        this.onChange(party)
    }

    /** gets a project by its name */
    Get(name: string): genshin.charbox.Party {
        const party = this.projects.get(name)
        if (!party) {
            throw new Error("Cannot find project named: " + name)
        }
        return party
    }

    /** Closes a project */
    Close(name: string): boolean {
        if (this.projects.size <= 1) {
            return false
        }
        const party = this.projects.get(name)
        if (!party) {
            return false
        }
        const map = this.projects.delete(name)
        const index = this.names.indexOf(name)
        if (!map || index === -1) {
            return false
        }
        this.names.splice(index, 1)
        if (this.current === party) {
            this.Set(this.names[index % this.names.length])
        }
        return true
    }

    /** Adds and sets as current the given party with the given title
     * @returns True if the party was added (it wasn't already added)
     */
    Open(name: string, party: genshin.charbox.Party): boolean {
        const exists = Array.from(this.projects.values()).includes(party)
        if (exists) {
            return false
        }
        name = name.trim()
        if (this.projects.has(name)) {
            return false
        }
        this.projects.set(name, party)
        this.names.unshift(name)
        this.current = party
        this.onChange(party)
        return true
    }

    /** Gets the current open project  */
    GetCurrent(): undefined | [string, genshin.charbox.Party] {
        if (!this.current) {
            return undefined
        }
        const pair = Array
            .from(this.projects.entries())
            .find(([, party]) => party === this.current)

        return pair
    }

    /** Is the given project name the current one? */
    IsCurrent(name: string): boolean {
        const current = this.GetCurrent()
        if (!current) { return false }
        return current[0] === name
    }
}
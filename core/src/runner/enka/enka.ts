import { GetEnka } from "@src/api/enka/get"
import { charbox } from "@src/core"
import { strings } from "@src/strings"
import { RunnerCmd } from "../cmd"

export const cmd_enka = RunnerCmd(() => {

    let WaitList: charbox.Charbox[] = []

    return {
        "uid": {
            description: "Imports characters from a player UID using Enka.Network service",
            example: "enka uid 609609619",
            arguments: ["UID"],
            compile({ Log }, [uid]) {
                return function enka_uid() {
                    Log.Log("Importing from Enka.Network service. Please wait...")
                    GetEnka(uid).then(data => {
                        WaitList = data

                        const table = new strings.Table(strings.labels.CHARACTER, strings.labels.LEVEL)
                        for (const box of WaitList) {
                            const char = box.GetCharacter()
                            table.AddRow(char.Options.Name, char.GetLevel())
                        }

                        Log.Log("\nImported characters:\n" + table.String())
                        Log.Logf("Imported %d characters from Enka.Network", data.length)
                        Log.Log("Run `enka load <characters...>` to load an imported character to the current party")
                    }).catch(e => Log.Error(String(e).valueOf()))
                }
            }
        },
        "load": {
            description: "Loads characters imported from Enka.Network to the current party",
            example: "enka load hutao xingqiu yelan zhongli",
            compile(program, names) {
                const { Value, Log } = program
                return function enka_load() {
                    const list: charbox.Charbox[] = []
                    for (const name of names) {
                        const found = WaitList.find(box => box.GetCharacter().Options.Name.toLowerCase() === name)
                        if (!found) {
                            Log.Errorf("Character \"%s\" not found in Enka", name)
                            continue
                        }
                        Value.Party.Add(found)
                        list.push(found)
                    }

                    Log.Logf("Added %d characters to the party", list.length)

                    if (list.length > 0) {
                        program.Compile(["character", "set", list[0].GetCharacter().Options.Name], { line: Log.Line })()
                    }
                }
            }
        }
    }
})
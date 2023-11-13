import { GetEnka } from "@src/api/enka/get"
import { charbox } from "@src/core"
import { strings } from "@src/strings"
import { RunnerCmd } from "../cmd"

export const cmd_enka = RunnerCmd(() => {

    let WaitList: charbox.Charbox[] = []

    return {
        "uid": {
            name: "uid",
            description: "Imports characters from a player UID using Enka.Network service",
            example: "enka uid 609609619",
            arguments: "UID",
            compile({ values: [uid] }, { logger }) {
                return function enka_uid() {
                    logger.log("Importing from Enka.Network service. Please wait...")
                    GetEnka(uid).then(data => {
                        WaitList = data

                        const table = new strings.Table(strings.labels.CHARACTER, strings.labels.LEVEL)
                        for (const box of WaitList) {
                            const char = box.GetCharacter()
                            table.AddRow(char.Options.Name, char.GetLevel())
                        }

                        logger.log("\nImported characters:\n" + table.String())
                        logger.logf("Imported %d characters from Enka.Network", data.length)
                        logger.log("Run `enka load <characters...>` to load an imported character to the current party")
                    }).catch(e => logger.error(String(e).valueOf()))
                }
            }
        },
        "load": {
            name: "load",
            arguments: "characters...",
            description: "Loads characters imported from Enka.Network to the current party",
            example: "enka load hutao xingqiu yelan zhongli",
            compile({ values: names }, { context, logger }) {
                return function enka_load() {
                    const list: charbox.Charbox[] = []
                    for (const name of names) {
                        const found = WaitList.find(box => box.GetCharacter().Options.Name.toLowerCase() === name)
                        if (!found) {
                            logger.errorf("Character \"%s\" not found in Enka", name)
                            continue
                        }
                        context.Party.Add(found)
                        list.push(found)
                    }

                    logger.logf("Added %d characters to the party", list.length)

                    if (list.length > 0) {
                        context.GetCompiler().compileString(
                            "character set " + list[0].GetCharacter().Options.Name,
                            { line: logger.line }
                        )()
                    }
                }
            }
        }
    }
})
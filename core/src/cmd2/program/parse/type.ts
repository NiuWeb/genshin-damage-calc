/** unparsed line */
export interface Line { 
    /** line code */
    text: string
    /** line number */
    line: number
}

/** parsed line */
export interface Parsed {
    /** command to execute */
    cmd: string[]
    /** command line number */
    line: number
}

export interface Template { 
    description: string
    example?: string
    arguments: string[]
    before: string[]
    after: string[]
}

export type Templates = {
    [templateName: string]: Template
}

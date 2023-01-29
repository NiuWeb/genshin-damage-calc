const tokenize = (token: string, value: string) => `<span class="${token}">${value}</span>`
/** parses an expression to html tags */
export function parseFormulaHtml(formula: string): string {
  return formula
    .replace(TOKEN, (_, value: string) => {
      for (const [token, expr] of Object.entries(EXPR)) {
        if (value.match(expr)) {
          return tokenize(token.toLowerCase(), value)
        }
      }
      return value
    })
    .replace(/&/g, "<div class=\"align\"></div>")
}

const EXPR = {
  SYMBOL: /([a-z_]\w*)/ig,
  OPERATOR: /(\*|\+|-|\/|\^|=)/g,
  PARENTHESIS: /(\(|\)|\[|\])/g,
  NUMBER: /([0-9]+(?:\.[0-9]+)?%?)/g,
}

const TOKEN = new RegExp("(" + Object.values(EXPR).map(s => s.source).join("|") + ")", "ig")
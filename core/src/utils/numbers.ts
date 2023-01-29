/**
 * Converts a number to string with the given number of places.
 * It also removes trailing zeros
 */
 export function toPlaces(number: number, places: number): string { 
    let strval = number.toFixed(places)
    strval = strval.replace(/\.([0-9]*)([1-9])0+$/, ".$1$2")
    strval = strval.replace(/\.0+$/, "")
    return strval
}
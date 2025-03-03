export interface CountryType {
    flag: officialflag
    name: countryName
}
interface officialflag {
    png: string,
    svg: string
}
export interface countryName {
    shortname: string
}
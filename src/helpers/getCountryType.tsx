export interface CountryType {
    flag: officialflag
    name: countryName
}
interface officialflag {
    png: string,
    svg: string
}
interface countryName {
    shortname: string
}
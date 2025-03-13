export interface NextWestherType {
    "time_epoch": number,
    "time": string,
    "temp_c": number,
    "temp_f": number,
    "is_day": number,
    "condition": {
        "text": string,
        "icon": string,
        "code": number
    },
}
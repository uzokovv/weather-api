import { CountryType } from "./getCountryType";

export type CountryContextType = {
    data: CountryType[];  // Array bo‘lishi kerak
    setdata: (value: CountryType[]) => void;
    choseCountry: CountryType | null;
    setChoseCountry: (value: string) => void;
    isLoading: boolean;
    isError: boolean;
};

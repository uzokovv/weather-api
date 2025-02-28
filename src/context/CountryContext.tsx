import { createContext, useState } from "react";
import { CountryType } from "../helpers/getCountryType";
import axios, { AxiosResponse } from "axios";
import { config } from "../helpers/url";
import { useQuery } from "@tanstack/react-query";

type CountryContextType = {
    choseCountry: CountryType | null;
    setdata: React.Dispatch<React.SetStateAction<CountryType | null>>;
};

// Kontekstni yaratishda `defaultValue` berish kerak
export const CountryContext = createContext<CountryContextType | null>(null);

export const CountryProvider = ({ children }: any) => {
    const [choseCountry, setdata] = useState<CountryType | null>(null)
    async function getCountry() {
        try {
            const res: AxiosResponse = await axios.get<CountryType[]>('https://rest-countries10.p.rapidapi.com/countries', config);
            return res.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw new Error("Failed to fetch countries data");
        }
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ["country"],
        queryFn: getCountry
    })
    return (
        <CountryContext.Provider value={{ data, isLoading, isError, choseCountry, setdata }}>
            {children}
        </CountryContext.Provider>
    )
}

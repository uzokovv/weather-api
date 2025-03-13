import { createContext, useState } from "react";
// import { CountryType } from "../helpers/getCountryType";
import axios, { AxiosResponse } from "axios";
import { config } from "../helpers/url";
import { useQuery } from "@tanstack/react-query";
// import { CountryContextType } from "../helpers/contextType";


// Kontekstni yaratishda `defaultValue` berish kerak
export const CountryContext = createContext<any>(null);

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [choseCountry, setdata] = useState<any>(null)

    async function getCountry() {
        try {
            const res: AxiosResponse = await axios.get<any>('https://rest-countries10.p.rapidapi.com/countries', config);
            return res.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw new Error("Failed to fetch countries data");
        }
    }

    const { data = [], isLoading, isError } = useQuery<any>({
        queryKey: ["country"],
        queryFn: () => getCountry()
    })
    return (
        <CountryContext.Provider value={{ data, isLoading, isError, choseCountry, setdata }}>
            {children}
        </CountryContext.Provider>
    )
}

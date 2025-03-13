import { createContext, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { config } from "../helpers/url";
import { useQuery } from "@tanstack/react-query";
import { countryName, CountryType } from "../helpers/getCountryType";

export const CountryContext = createContext<any>(null);

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [choseCountry, setdata] = useState<countryName | null>(null)

    async function getCountry() {
        try {
            const res: AxiosResponse = await axios.get<CountryType>('https://rest-countries10.p.rapidapi.com/countries', config);
            return res.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw new Error("Failed to fetch countries data");
        }
    }

    const { data = [], isLoading, isError } = useQuery<CountryType>({
        queryKey: ["country"],
        queryFn: () => getCountry()
    })
    return (
        <CountryContext.Provider value={{ data, isLoading, isError, choseCountry, setdata }}>
            {children}
        </CountryContext.Provider>
    )
}

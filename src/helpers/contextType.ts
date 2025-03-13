// import { CountryType } from "./getCountryType";

// export type CountryContextType = {
//     data: CountryType[];
//     setdata: React.Dispatch<React.SetStateAction<CountryType | null>>; // Array sifatida o‘zgartirildi
//     choseCountry: CountryType[] | null;
//     // setChoseCountry: React.Dispatch<React.SetStateAction<CountryType[] | null>>; // Array qabul qiladi
//     setChoseCountry: (value: CountryType) => void;
//     isLoading: boolean;
//     isError: boolean;
// };

export type CountryContextType = {
    data: any
    setdata: any// Array sifatida o‘zgartirildi
    choseCountry: any
    // setChoseCountry: React.Dispatch<React.SetStateAction<CountryType[] | null>>; // Array qabul qiladi
    setChoseCountry: any
    isLoading: any;
    isError: any;
};

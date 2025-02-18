import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { IoRainyOutline } from "react-icons/io5";
import { Button, TextField } from '@mui/material';
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { WeatherResponse } from "../helpers/types";
import { token, Url } from "../helpers/url";
import { useRef } from "react";

const TodayWeather = () => {

    const inputRef = useRef<HTMLInputElement | null>(null)
    async function getWeather() {
        const res: AxiosResponse = await axios.get<WeatherResponse>(`${Url}current.json?q=uzbekistan&key=${token}`)
        return res.data
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['location'],
        queryFn: getWeather
    })

    error ? <h1>{error?.message}</h1> : null
    isLoading ? <h1>loading...</h1> : null
    function searchBtn() {
        if (inputRef.current?.value) {
            return "eror"
        }
    }
    return (
        <div>
            <div className='bg-white flex justify-center items-center p-5 gap-5'>
                <TextField
                    inputRef={inputRef}
                    id="outlined-multiline-flexible"
                    label="qidirish"
                    multiline
                    maxRows={4}
                    focused
                />
                <Button onClick={() => searchBtn()} variant="contained">search</Button>
            </div>
            {/* kunlik ob havo */}
            {data && (
                <div className='' key={1}>
                    <div>
                        <h1 className='mt-30 text-white text-3xl'>{data.location.country}, {data.location.region}</h1>
                        <h1 className='text-white text-2xl opacity-80'>hozir Soat: {data.location.localtime.substring(11, 17)}, kecha bu vaqtda 3°</h1>
                    </div>
                    <div className='flex mt-9'>
                        <div className='flex items-center'>
                            <h1 className='text-white text-8xl'>{data.current.temp_c}°</h1>
                            <img className='w-30 h-30' src={data.current.condition.icon} alt="weather icon" />
                        </div>
                        <div className='flex justify-center flex-col ml-5'>
                            <h1 className='text-white text-2xl'>Aniqlik bilan {data.current.condition.text}</h1>
                            <h1 className='text-white text-2xl'>His qilinishi: {data.current.feelslike_c}°</h1>
                        </div>
                    </div>
                    <div className='flex justify-between mt-15 w-[80%] mx-auto'>
                        <div className='flex gap-3 items-center'>
                            <FaWind size={52} className="text-blue-300" />
                            <span className="text-lg font-semibold text-white">{data.current.wind_kph} km/h {data.current.wind_dir}</span>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <WiHumidity size={62} className="text-blue-300" />
                            <h1 className="text-2xl font-semibold text-white ">{data.current.humidity}%</h1>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <IoRainyOutline size={52} className="text-blue-300" />
                            <span className="text-lg font-semibold text-white">{data.current.precip_mm == 0 ? 'None' : data.current.precip_mm && "%"}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TodayWeather
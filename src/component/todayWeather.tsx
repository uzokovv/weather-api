import OpacityIcon from '@mui/icons-material/Opacity';
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { WeatherResponse } from "../helpers/getWeatherType";
import { token, Url } from "../helpers/url";
import Clock from "./clock";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AirIcon from '@mui/icons-material/Air';

const TodayWeather = ({ name }: any) => {

    async function getWeather() {
        const res: AxiosResponse = await axios.get<WeatherResponse>(`${Url}current.json?q=${name ? name : 'uzbekistan'}&key=${token}`)
        return res.data
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['location'],
        queryFn: getWeather
    })

    error ? <h1>{error?.message}</h1> : null

    return (
        <div className='container mx-auto px-20'>
            {isLoading ? <h1 className="text-3xl text-white">loading...</h1> : null}
            {/* kunlik ob havo */}
            {data && (
                <div className='' key={1}>
                    <div>
                        <h1 className='mt-30 text-white text-3xl'>{data.location.country}, {data.location.region}</h1>
                        <h1 className='text-white text-2xl opacity-80 flex gap-3'>hozir Soat: <Clock /> </h1>
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
                            <AirIcon className='text-3xl text-white' />
                            <span className="text-lg font-semibold text-white">{data.current.wind_kph} km/h {data.current.wind_dir}</span>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <OpacityIcon className='text-white text-3xl' />
                            <h1 className="text-2xl font-semibold text-white ">{data.current.humidity}%</h1>
                        </div>
                        <div className='flex gap-3 items-center text-white'>
                            <ThunderstormIcon />
                            {data.current.precip_mm > 0 ? <h1 className="text-lg font-semibold text-white">{data.current.precip_mm}%</h1> : <h1>None</h1>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TodayWeather
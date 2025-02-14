import axios, { AxiosResponse } from 'axios'
import { token, Url } from '../helpers/url'
import { useQuery } from '@tanstack/react-query'
import { Current, Location } from '../helpers/types'
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { IoRainyOutline } from "react-icons/io5";
import { toast } from 'react-toastify';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const Home: React.FC = () => {

  // ===================== bugungi ob havo ================
  async function getWeather() {
    const res: AxiosResponse = await axios.get<Location | Current>(`${Url}current.json?key=${token}&q=Uzbekistan&aqi=no`)
    return res.data
  }
  const { data, error } = useQuery({
    queryKey: ['location'],
    queryFn: getWeather
  })
  error ? toast.error(error.message) : ''
  // console.log(data);

  // ===================== kelachak ob havo ================
  async function getWeatherNext() {
    const res: AxiosResponse = await axios.get(`https://api.weatherapi.com/v1/future.json?q=uzbekistan&dt=2025-02-27&key=3ae903f87a374969aa5150905251102`)

    return res.data
  }

  getWeatherNext()
  const { data: datas, error: errors } = useQuery({
    queryKey: ['nextweather'],
    queryFn: getWeatherNext
  })
  console.log(datas?.forecast.forecastday[0].hour);

  errors ? toast.error(errors.message) : ''

  const [selectedCard, setSelectedCard] = React.useState(0);

  return (
    <div className='container mx-auto px-20'>
      {/* kunlik ob havo */}
      {data && (
        <div className=''>
          <div>
            <h1 className='mt-35 text-white text-3xl'>{data.location.country}, {data.location.region}</h1>
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
      <hr className='text-white opacity-60 mt-10' />

      {/* 10 kunlik ob havo*/}
      {datas && (
        <div className='text-6xl mt-30 text-white'>
          <h1 className='mb-5'>10 Kunlik ob havo</h1>
          {/* {datas?.forecast.forecastday[0].hour.map((item: any) => (
            <h1>{item.dewpoint_c}</h1>
          ))} */}
          <Box
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
              gap: 2,
            }}
          >
            {datas?.forecast.forecastday[0].hour.map((card: any, index: any) => (
              <Card>
                <CardActionArea
                  onClick={() => setSelectedCard(index)}
                  data-active={selectedCard === index ? '' : undefined}
                  sx={{
                    height: '100%',
                    '&[data-active]': {
                      backgroundColor: '#8EC5FF',
                      '&:hover': {
                        backgroundColor: 'action.selectedHover',
                      },
                    },
                  }}
                >
                  <CardContent className='opacity-50' sx={{ height: '100%', backgroundColor: '#8EC5FF', }}>
                    <Typography variant="h5" component="div">
                      {card.time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.temp_c}°
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.condition.text}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <img src={card.condition.icon} alt="" />
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </div>
      )}
    </div>
  )
}

export default Home
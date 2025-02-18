import axios, { AxiosResponse } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { WeatherResponse } from '../helpers/types'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { toast } from 'react-toastify';
import { token, Url } from '../helpers/url';

const NextWeather = () => {
    const today = new Date()
    today.setDate(today.getDate() + 14); // Bugungi kunga 14 kun qo‘shiladi
    const year = today.toISOString().split('T')[0]

    async function getWeatherNext() {
        const res: AxiosResponse = await axios.get<WeatherResponse>(`${Url}future.json?q=uzbekistan&dt=${year}&key=${token}`)
        return res.data
    }

    const { data: datas, error: errors } = useQuery({
        queryKey: ['nextweather'],
        queryFn: getWeatherNext
    })
    // console.log(datas?.forecast.forecastday[0].hour);

    errors ? toast.error(errors.message) : ''

    const [selectedCard, setSelectedCard] = React.useState(0);
    return (
        <div>
            {datas && (
                <div key={2} className='text-6xl mt-30 text-white'>
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
                                <CardActionArea className='bg-white'
                                    onClick={() => setSelectedCard(index)}
                                    data-active={selectedCard === index ? '' : undefined}
                                    sx={{
                                        height: '100%',
                                        '&:hover': {
                                            backgroundColor: 'action.selectedHover',
                                        },
                                    }}
                                >
                                    <CardContent className='text-center text-white' sx={{ height: '100%', backgroundColor: '#5D98E2', }}>
                                        <Typography variant="h5" component="div">
                                            {card.time.substring(11, 17)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <h1 className='text-3xl text-white'>{card.temp_c}°</h1>
                                        </Typography>
                                        <Typography className='text-white' variant="body2" color="text.secondary">
                                            {card.condition.text}
                                        </Typography>
                                        <Typography className='flex justify-center text-white' variant="body2" color="text.secondary">
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

export default NextWeather
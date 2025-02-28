import axios, { AxiosResponse } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { WeatherResponse } from '../helpers/getWeatherType'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { toast } from 'react-toastify';
import { token, Url } from '../helpers/url';
import { LinearProgress } from '@mui/material';

const NextWeather = () => {
    const today = new Date()
    today.setDate(today.getDate() + 14); // Bugungi kunga 14 kun qo‘shiladi
    const year = today.toISOString().split('T')[0]

    async function getWeatherNext() {
        const res: AxiosResponse = await axios.get<WeatherResponse>(`${Url}future.json?q=uzbekistan&dt=${year}&key=${token}`)
        return res.data
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['nextweather'],
        queryFn: getWeatherNext
    })

    error ? toast.error(error.message) : ''

    const [selectedCard, setSelectedCard] = React.useState(0);
    return (
        <div className='container mx-auto px-20'>
            {isLoading ? 
            <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
            : null}
            {data && (
                <div className='text-6xl mt-30 text-white'>
                    <h1 className='mb-5'>14 Kunlik ob havo</h1>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                            gap: 2,
                        }}
                    >
                        {data?.forecast.forecastday[0].hour.map((card: any, index: any) => (
                            <Card key={index}>
                                <CardActionArea className=''
                                    onClick={() => setSelectedCard(index)}
                                    data-active={selectedCard === index ? '' : undefined}
                                    sx={{
                                        height: '100%',
                                        '&:hover': {
                                            backgroundColor: 'action.selectedHover',
                                        },
                                    }}
                                >
                                    <CardContent className='text-center text-black' sx={{ height: '100%', paddingX: '0px', width: '50%', marginX: 'auto'}}>
                                        <Typography variant="h5" component="div">
                                            {card.time.substring(11, 17)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <span className='text-3xl text-black'>{card.temp_c}°</span>
                                        </Typography>
                                        <Typography className='text-black' variant="body2" color="text.secondary">
                                            {card.condition.text}
                                        </Typography>
                                        <Typography className='flex justify-center text-black' variant="body2" color="text.secondary">
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

import NextWeather from '../component/nextWeather';
import TodayWeather from '../component/todayWeather';

const Home: React.FC = () => {

  return (
    <div className='container mx-auto px-20'>
      {/*  ===================== bugungi ob havo ================ */}
      <TodayWeather />
      <hr className='text-white opacity-60 mt-10' />
      {/* 10 kunlik ob havo*/}
      <NextWeather />
    </div>
  )
}

export default Home
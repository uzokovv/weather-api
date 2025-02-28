
import NextWeather from '../component/nextWeather';
import Search from '../component/search';
import TodayWeather from '../component/todayWeather';

const Home: React.FC = () => {

  return (
    <div>
      {/* ======================search=========================== */}
      <Search />
      {/*  ===================== bugungi ob havo ================ */}
      <TodayWeather />
      <hr className='text-white opacity-60 mt-10' />
      {/* ======================10 kunlik ob havo===================*/}
      <NextWeather />
      <div className='h-8'></div>
    </div>
  )
}

export default Home
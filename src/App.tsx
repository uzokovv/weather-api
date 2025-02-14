import bakimg from '../src/assets/download.jpg'
import '../src/index.css'
import Home from './pages/home'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer }  from'react-toastify';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      <img src={bakimg} className='bak' alt="" />
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App

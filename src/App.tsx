import '../src/index.css'
import { CountryProvider } from './context/CountryContext';
import Home from './pages/home'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CountryProvider>
        <Home />
        <ToastContainer />
      </CountryProvider>
    </QueryClientProvider>
  )
}

export default App

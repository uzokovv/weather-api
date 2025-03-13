// import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { CountryType } from '../helpers/getCountryType';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from 'react';
import { CountryContext } from '../context/CountryContext';

const Search = () => {
    // const [countrysData, setcountrysData]= useState<any>(null)
    const [focus, setOnfocus] = useState<boolean>(false)
    const [searchvalue, setsearchValue] = useState<string >("");
    // const context = useContext<CountryContextType | null>(CountryContext);

    const context = useContext(CountryContext);
    if (!context) {
        throw new Error("CountryContext must be used within a CountryProvider");
    }
    const { data, isError, setdata } = context

    if (isError) return <p>Error loading data</p>;

    const filteredData = data?.length
        ? data.filter((item: CountryType) =>
            item?.name.shortname.toLowerCase().includes(searchvalue.toLowerCase())
        )
        : [];

    return (
        <div>
            <div>
                <Box sx={{ flexGrow: 1, position: 'sticky', top: 0, zIndex: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                Weather <i>Demo</i>
                            </Typography>
                            <div className="flex items-center max-w-sm mx-auto">
                                <label htmlFor="simple-search" className="sr-only">Search</label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <SearchIcon className='text-[#141414]' />
                                    </div>
                                    <input placeholder='Qidiring...' value={searchvalue} onChange={(e) => setsearchValue(e.target.value)} onFocus={() => setOnfocus(true)} id="simple-search" className="bg-gray-50 borde text-black text-sm rounded-lg outline-0 block w-full ps-10 p-2.5  dark:bg-[#e3e3e3] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Box sx={{ display: focus ? "block" : "none", overflow: "auto", height: "350px", position: "absolute", right: "10px", marginTop: "10px", padding: "10px", borderRadius: "10px", bgcolor: 'white', width: "300px" }}>
                        <div className='flex justify-end'>
                            <Button onClick={() => setOnfocus(false)} sx={{ color: 'black' }}><CloseIcon /></Button>
                        </div>
                        <hr className='opacity-15' />
                        {filteredData && filteredData.length > 0 ? (
                            filteredData.map((item: CountryType, index: number) => (
                                <div key={index}>
                                    <SearchIcon />
                                    <Button sx={{ color: 'black', }} onClick={() => {
                                        setdata(item.name.shortname)
                                    }}>
                                        {item.name?.shortname}
                                    </Button>
                                </div>
                            ))
                        ) : "topilmadi"}
                    </Box>
                </Box>
            </div>
        </div>
    );
}


export default Search
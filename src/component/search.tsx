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
    const [searchvalue, setsearchValue] = useState<string>('')
    const context = useContext(CountryContext);

    if (!context) {
      return <h1 className="text-red-500">Error: CountryContext is not provided!</h1>;
    }
    

    const { data, isLoading, isError, setdata } = context
    console.log(data);
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading data</p>;

    // function searchBtn(inputValue: string) {
    //     console.log(inputValue);
    // }

    // ================== Ui navbat ============================
    // const Search = styled('div')(({ theme }) => ({
    //     position: 'relative',
    //     borderRadius: theme.shape.borderRadius,
    //     backgroundColor: alpha(theme.palette.common.white, 0.15),
    //     '&:hover': {
    //         backgroundColor: alpha(theme.palette.common.white, 0.25),
    //     },
    //     marginLeft: 0,
    //     width: '100%',
    //     [theme.breakpoints.up('sm')]: {
    //         marginLeft: theme.spacing(1),
    //         width: 'auto',
    //     },
    // }));

    // const SearchIconWrapper = styled('div')(({ theme }) => ({
    //     padding: theme.spacing(0, 2),
    //     height: '100%',
    //     position: 'absolute',
    //     pointerEvents: 'none',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // }));

    // const StyledInputBase = styled(InputBase)(({ theme }) => ({
    //     color: 'inherit',
    //     width: '100%',
    //     '& .MuiInputBase-input': {
    //         padding: theme.spacing(1, 1, 1, 0),
    //         // vertical padding + font size from searchIcon
    //         paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    //         transition: theme.transitions.create('width'),
    //         [theme.breakpoints.up('sm')]: {
    //             width: '12ch',
    //             '&:focus': {
    //                 width: '20ch',
    //             },
    //         },
    //     },
    // }));


    const filteredData = data?.length
        ? data.filter((item: any) =>
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
                            {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchvalue}
                            onChange={(e) => setsearchValue(e.target.value)}
                            onFocus={() => setOnfocus(!focus)}
                        />
                    </Search> */}

                            <div className="flex items-center max-w-sm mx-auto">
                                <label htmlFor="simple-search" className="sr-only">Search</label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                                </svg> */}
                                        <SearchIcon />
                                    </div>
                                    <input type="text" placeholder='qidiribg...' value={searchvalue} onChange={(e) => setsearchValue(e.target.value)} onFocus={() => setOnfocus(true)} id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Box sx={{ display: focus ? "block" : "none", overflow: "auto", height: "350px", position: "absolute", right: "10px", marginTop: "10px", padding: "10px", borderRadius: "10px", bgcolor: 'white', width: "300px" }}>
                        <div className='flex justify-end'>
                            <Button onClick={() => setOnfocus(false)} sx={{ color: 'black', padding: 1 }}><CloseIcon /></Button>
                        </div>
                        <hr className='opacity-15' />
                        {filteredData && filteredData.length > 0 ? (
                            filteredData.map((item: CountryType, index: number) => (
                                <div key={index}>
                                    <SearchIcon />
                                    <Button sx={{ color: 'black', }} onClick={() => {
                                        setdata(item.name?.shortname)
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
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import axios, { AxiosResponse } from 'axios';
import { useEffect } from "react";
import { config } from '../helpers/url';
import { useQuery } from '@tanstack/react-query';
import { CountryType } from '../helpers/getCountryType';

const Search = () => {
    // const [countrysData, setcountrysData]= useState<any>(null)
    const countries: CountryType[] = []

    async function getCountry() {
        const res: AxiosResponse = await axios.get<CountryType[]>('https://rest-countries10.p.rapidapi.com/countries', config)
        return res.data
    }
    countries && countries.length > 0 ? console.log(countries) : null
    const { data } = useQuery({
        queryKey: ["country"],
        queryFn: getCountry
    })
    data && data.length > 0 ? data.map((item: any) => countries.push(item)) : null
    useEffect(() => {
        countries && countries.length > 0 && countries.map((item: CountryType) => {
            console.log(item);
        });

    })

    // const inputRef = useRef<HTMLInputElement | null>(null)

    // function searchBtn() {
    //     if (inputRef.current?.value) {
    //         return "info"
    //     }
    // }

    // ================== Ui navbat ============================
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    return (
        <Box sx={{ flexGrow: 1, position: 'sticky', top: 0, zIndex:1 }}>
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
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}


export default Search
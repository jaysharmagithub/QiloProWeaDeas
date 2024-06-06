
import "./globals.css"
import "./App.css"
import {
    AppBar,
    Box,
    Button,
    Fab,
    Fade,
    IconButton, Link,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useScrollTrigger
} from "@mui/material";
import ThemeSwitcher from "./Components/ThemeSwitcher";
import WeatherDashboard from "./Components/WeatherDashboard";
import { CustomThemeProvider } from "./context/ThemeContext";
import ImageComponent from "./Components/ImageComponent.jsx";
import {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BrChart from "./BarChart/BrChart.jsx"
import Notepad from "./Notepad/Notepad.jsx";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";



function ScrollTop(props) {
    const { children,window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Fade>
    );
}

function App(props) {
  // const [count, setCount] = useState(0)
    const [anchorElNav, setAnchorElNav] = useState(null);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };



    return (
    <CustomThemeProvider>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: '#000066' }}>
          <Toolbar>


            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
              >
                <MenuItem><Link href="/" >Home</Link></MenuItem>
                <MenuItem><Link href="/barchart">Barchart</Link></MenuItem>
                <MenuItem><Link href="/notepad">Notepad</Link></MenuItem>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'flex' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
            >
              Weather DashBoard
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button href="/">Home</Button>
              <Button href="/barchart">BarChart</Button>
              <Button href="/notepad">Notepad</Button>
            </Box>
            <ThemeSwitcher />
          </Toolbar>
        </AppBar>
          <Toolbar id="back-to-top-anchor" />
            <BrowserRouter>
                <Routes>

                        <Route path={"/"} element={<WeatherDashboard/>} />
                        <Route path={"/barchart"} element={<BrChart/>} />
                        <Route path={"/notepad"} element={<Notepad/>} />
                </Routes>
            </BrowserRouter>
          <ScrollTop {...props}>
              <Fab size="small" aria-label="scroll back to top">
                  <KeyboardArrowUpIcon />
              </Fab>
          </ScrollTop>
      </Box>
    </CustomThemeProvider>
  );
}


export default App;

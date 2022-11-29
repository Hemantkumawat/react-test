import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LoginWithGoogle, {  auth } from "../Services/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Divider } from '@mui/material';
import { useNavigate } from "react-router-dom";

const pages = ['Home'];

function ResponsiveAppBar({props}) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [loginUser, setLoginUser] = React.useState(null)

    let navigate = useNavigate();

    React.useEffect(() => {
        onAuthStateChanged(auth, userAuthHandler);
    }, [])

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const userAuthHandler = (user) => {
        if (user) {
            // Login
            setLoginUser(user)
        } else {
            // Logout
            setLoginUser(null)
        }
    }
    const logout = () => {
        signOut(auth);
        navigate("/");
    }
    var element;
    if (loginUser) {
        // Authenticated User
        const displayName = auth.currentUser.displayName;
        const photoURL = auth.currentUser.photoURL;
        element = (
            // <button onClick={() => signOut(auth)}>Logout</button>
            // <h1>Welcome {displayName}!</h1>
            // {/* <img style={{ margin: "10px" }} alt="Profile icon" src={photoURL} /> */}
            // <Avatar alt={displayName} src={photoURL} />

            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={displayName} src={photoURL} />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem key={1}>
                        <Typography textAlign="center">{displayName}</Typography>
                    </MenuItem>
                    <Divider></Divider>
                    <MenuItem key={2} onClick={() => logout()}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        );
    } else {
        // Guest User
        element = (
            // <>
            //     <Button variant="contained" color="info" onClick={signInWithGoogle} endIcon={<GoogleIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />}>
            //         Sign in with Google
            //     </Button>
            // </>
            <LoginWithGoogle></LoginWithGoogle>
        );
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        R1
                    </Typography>

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
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {loginUser ? (
                            <Button
                                key="home"
                                href='/home'
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Home
                            </Button>) : (<div></div>)}
                    </Box>
                    {element}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
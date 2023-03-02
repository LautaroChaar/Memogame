import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { dataContext } from '../../context/DataContext';
import './Navbar.css';

const pages = ['Pokemon', 'Numbers'];

export default function Navbar() {
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { selectDificulty, startGame, dataUser, userLoggedOut, isLogged, deleteElements, updateMistakes } = React.useContext(dataContext);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleStatisticsClick = () => {
    Swal.fire({
      title: 'Statistics',
      color: '#AD343E',
      html: `
      <p style='color: #b7b7b7; font-weight: bold; font-family: Ubuntu, sans-serif;' class="trofeos">You have <span style='color: #e6d839' >${dataUser.trophies}</span> trophies</p>
      <p style='color: #AD343E; font-weight: bold; font-family: Ubuntu, sans-serif;' class="scoreTitle">Numbers trophies</p>
      <div class="dificulty" style='color: #b7b7b7; font-weight: bold; font-family: Ubuntu, sans-serif;'>
      <p>Easy: <span style='color: #e6d839'>${dataUser.games[1]['numbers'].easy}</span></p><p> Medium: <span style='color: #e6d839'>${dataUser.games[1]['numbers'].medium}</span></p><p> Hard: <span style='color: #e6d839'>${dataUser.games[1]['numbers'].hard}</span></p>
      </div>
      <p class="scoreTitle" style='color: #AD343E; font-weight: bold; font-family: Ubuntu, sans-serif;'>Pokememo trophies</p>
      <div class="dificulty" style='color: #b7b7b7; font-weight: bold; font-family: Ubuntu, sans-serif;'>
      <p>Easy: <span style='color: #e6d839'>${dataUser.games[0]['pokemon'].easy}</span></p><p> Medium: <span style='color: #e6d839'>${dataUser.games[0]['pokemon'].medium}</span></p><p> Hard: <span style='color: #e6d839'>${dataUser.games[0]['pokemon'].hard}</span></p>
      </div>
      `,
      background: '#242424',
      confirmButtonText: 'Close',
      confirmButtonColor: '#2a2731'
    });
  }

  const handlePagesClick = () => {
    startGame(false);
    deleteElements();
    selectDificulty('Easy');
    updateMistakes(-1);
}

  const handleLoggedOutClick = () => {
    userLoggedOut()
    localStorage.setItem('isLogged', false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }

  if (isLogged === false) {
    return (
    <AppBar position="static" sx={{backgroundColor: '#242424'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
          variant="h6"
          noWrap
          sx={{
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'Ubuntu',
            fontSize: '1.5rem',
            fontWeight: 700
          }}
          >
            <Link to={'/'} className='logo'>
              P
              <CatchingPokemonIcon sx={{ display: { xs: 'none', md: 'flex' }, color: '#AD343E'}} />
              KEMEM
              <CatchingPokemonIcon sx={{ display: { xs: 'none', md: 'flex' }, color: '#AD343E'}} />
            </Link> 
          </Typography>
          <Typography
          variant="h6"
          noWrap
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: {xs: 'center', sm: 'start'},
            flexGrow: 1,
            fontFamily: 'Ubuntu',
            fontSize: '1.5rem',
            fontWeight: 700
          }}
          >
            <Link to={'/'} className='logo'>
              P
              <CatchingPokemonIcon sx={{ display: { xs: 'flex', md: 'none' }, color: '#AD343E'}} />
              KEMEM
              <CatchingPokemonIcon sx={{ display: { xs: 'flex', md: 'none' }, color: '#AD343E'}} />
            </Link> 
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>)
  }

  return (
    <AppBar position="static" sx={{backgroundColor: '#242424'}}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'center' }} >
          <Typography
          variant="h6"
          noWrap
          sx={{
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'Ubuntu',
            fontSize: '1.5rem',
            fontWeight: 700
          }}
          >
            <Link to={'/'} className='logo'>
              P
              <CatchingPokemonIcon sx={{ display: { xs: 'none', md: 'flex' }, color: '#AD343E'}} />
              KEMEM
              <CatchingPokemonIcon sx={{ display: { xs: 'none', md: 'flex' }, color: '#AD343E'}} />
            </Link> 
          </Typography>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
              '& .MuiPaper-root': {
                height: '100vh',
                width: '40vw',
                backgroundColor: '#242424',
                boxShadow: 'none',
                left: '0px !important',
                top: '50px !important'
              },
              '& .MuiList-root': {
                height: '100%',
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly'
              },
              '& .MuiMenuItem-root': {
                textTransform: 'uppercase',
                justifyContent: 'center',
                height: '50%',
                '&:hover .linkPages': {
                color: '#f5f5dc'
                } 
              }
            }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography >
                    <Link to={`/${page.toLowerCase()}`} className='linkPages' onClick={ () => { handlePagesClick() } }>
                      {page}
                    </Link> 
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
          variant="h6"
          noWrap
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: {xs: 'center', md: 'star'},
            flexGrow: 1,
            fontFamily: 'Ubuntu',
            fontSize: '1.5rem',
            fontWeight: 700
          }}
          >
            <Link to={'/home'} className='logo'>
              P
              <CatchingPokemonIcon sx={{ display: { xs: 'flex', md: 'none' }, color: '#AD343E'}} />
              KEMEM
              <CatchingPokemonIcon sx={{ display: { xs: 'flex', md: 'none' }, color: '#AD343E'}} />
            </Link> 
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly' }}>
            {pages.map((page) => (
              <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={`/${page.toLowerCase()}`} className='linkPages' onClick={ () => { handlePagesClick() } }>
                  {page}
                </Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'flex', md:'none' } }}>
            <IconButton size="medium" color="inherit" onClick={ () => { handleStatisticsClick() }} sx={{ '&:hover': {color: '#e6d839'} }} >
              <EmojiEventsIcon />
            </IconButton>
            <IconButton size="medium" color="inherit"  onClick={ () => {handleLoggedOutClick() }} sx={{ '&:hover': {color: '#AD343E'} }} >
              <LogoutIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex'} }}>
            <IconButton size="large" color="inherit" onClick={ () => { handleStatisticsClick() }} sx={{ '&:hover': {color: '#e6d839'} }} >
              <EmojiEventsIcon />
            </IconButton>
            <IconButton size="large" color="inherit"  onClick={ () => {handleLoggedOutClick() }} sx={{ '&:hover': {color: '#AD343E'} }} >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
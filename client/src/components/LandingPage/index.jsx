import { Box, Typography } from '@mui/material';
import Button from "@mui/material/Button";
import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { dataContext } from '../../context/DataContext';
import './LandingPage.css';

export default function LandingPage () {

  const { isLogged } = React.useContext(dataContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLogged) {
      navigate(`/home`);
    }
  }, [isLogged, navigate]);
  
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: {xs: 'calc(100vh - 172px)', sm: 'calc(100vh - 156px)'},
      backgroundColor: '#f5f5dc',
    }}>
      <Typography variant="h1" sx={{ fontFamily:'Ubuntu, sans-serif', fontSize: {xs: '1.2rem', sm: '1.5rem', md: '2rem'}, margin: '10px', fontWeight: 'bold', color: '#BA5F62' }}>
      Welcome to Pokememo
      </Typography>
      <Typography variant="h2" sx={{ fontFamily:'Ubuntu, sans-serif', fontSize: {xs: '1rem', sm: '1.3rem', md: '1.8rem'}, margin: '10px', color: '#BA5F62' }}>
      This memotest has two differents styles of game and three difficulties for each one.
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
      }}>
        <Button sx={{
          width: 'fit-content',
          background: 'none',
          marginTop: '20px',
          color: '#000',
          '&:hover': { backgroundColor: 'transparent'}
        }} 
        type="button"
        >
          <Link to={'/login'} className='linkForm' >Sign in</Link>
        </Button>
        <Button sx={{
          width: 'fit-content',
          background: 'none',
          marginTop: '20px',
          fontStyle: 'normal', 
          color: '#000',
          '&:hover': { backgroundColor: 'transparent'}
        }} 
        type="button">
          <Link to={'/register'} className='linkForm' >Sign up</Link>  
        </Button>
      </Box>
    </Box>
  );
}
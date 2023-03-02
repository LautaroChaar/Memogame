import { Box, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dataContext } from '../../context/DataContext';

export default function Home() {
  
  const { dataUser, isLoading, isLogged, validateLoading, getDataUser } = React.useContext(dataContext);
  
  const navigate = useNavigate();
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const user = localStorage.getItem('user');
        const response = await fetch(`${process.env.REACT_APP_URL_API}/api/home/${user}`, {
          method: 'GET',
          headers: {
            'authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const data = await response.json();
        getDataUser(data);
        validateLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      if (!isLogged) {
        navigate(`/`);
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, [isLogged]);

  if (isLoading) { 
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: {xs: 'calc(100vh - 172px)', sm:'calc(100vh - 156px)', md: 'calc(100vh - 164.5px)'},
        backgroundColor: '#f5f5dc',
      }}>
        <Typography variant="h1" sx={{ fontFamily:'Ubuntu, sans-serif', fontSize: {xs: '1.2rem', sm: '1.5rem', md: '2rem'}, margin: '10px', fontWeight: 'bold', color: '#BA5F62' }} >Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      minHeight: { xs: 'calc(100vh - 172px)', sm: 'calc(100vh - 156px)', md: 'calc(100vh - 164.5px)'},
      backgroundColor: '#f5f5dc',
    }}>
      <Typography variant="h1" sx={{ fontFamily:'Ubuntu, sans-serif', fontSize: {xs: '1.2rem', sm: '1.5rem', md: '2rem'}, margin: '10px', fontWeight: 'bold', color: '#BA5F62' }} >
        Welcome {dataUser.name}
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        <Box sx={{
          p: 2
        }}>
          <Typography variant="h2" sx={{ fontFamily:'Ubuntu, sans-serif', fontSize: {xs: '1rem', sm: '1.3rem', md: '1.8rem'}, margin: '10px', color: '#BA5F62', textDecoration: 'underline', fontWeight: 'bold' }}>
            "Numbers" section 
          </Typography>
          <Typography variant="h3" sx={{ fontFamily:'Ubuntu, sans-serif', fontSize: {xs: '1rem', sm: '1.3rem', md: '1.8rem'}, margin: '10px', color: '#BA5F62' }}>
          In the game "Numbers" some buttons will be generated with a number printed on each one. They'll be displayed for a few seconds and then they'll disappear. You have to find them from smallest to largest ( 1 - 2 - 3... ). If you make 5 mistakes you lose the game.
          </Typography>
        </Box>
        <Box sx={{
          p: 2
        }}>
          <Typography variant="h2" sx={{ fontFamily:'Ubuntu, sans-serif', fontSize: {xs: '1rem', sm: '1.3rem', md: '1.8rem'}, margin: '10px', color: '#BA5F62', textDecoration: 'underline', fontWeight: 'bold' }}>
            "Pokemon" section 
          </Typography>
          <Typography variant="h3" sx={{ fontFamily:'Ubuntu, sans-serif', fontSize: {xs: '1rem', sm: '1.3rem', md: '1.8rem'}, margin: '10px', color: '#BA5F62' }}>
          In the game 'Pokememo' you will have to find the two identical pokemons. You must rotate the pokeballs to see which pokemon contains. If you rotate two pokeballs and the pokemons doesn't match, they will hide again. If you make 3 ( easy ), 6 ( medium ) or 10 ( hard ) mistakes you lose the game.
          </Typography>
        </Box>
      </Box>
      <Typography variant="h4" sx={{ fontFamily:'Ubuntu, sans-serif', fontSize: {xs: '1rem', sm: '1.3rem', md: '1.8rem'}, margin: '10px', color: '#BA5F62', fontWeight: 'bold' }}>
      Enjoy and train your brain!
      </Typography>
    </Box>
  );
}



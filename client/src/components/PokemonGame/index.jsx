import { Box } from '@mui/system';
import React from 'react';
import { dataContext } from '../../context/DataContext';
import Pokeball from '../Pokeball';
import './PokemonGame.css';

export default function PokemonGame({ getSecondCard, getFirstCard, updateSelectCard, updateFirstUrl, updateSecondUrl, pokeball, selectCard }) {

  const { dificulty } = React.useContext(dataContext);

  let id = 1;
  
  return (
    <Box className='gameArea' sx={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      mt: 0,
      maxWidth: dificulty === 'Hard' ? { xs: 260, sm: 300, md: 488} : { xs: 200, sm: 260, md: 326}
    }}>
      { pokeball.map( (image, index) => (
        <Pokeball 
        key={index + 1} 
        image={image}
        id={id++} 
        selectCard={selectCard} 
        updateFirstUrl={updateFirstUrl} 
        updateSecondUrl={updateSecondUrl}
        updateSelectCard={updateSelectCard} 
        getFirstCard={getFirstCard}
        getSecondCard={getSecondCard}
        />
      )) }
    </Box>
  )
}
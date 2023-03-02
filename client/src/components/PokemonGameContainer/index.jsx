import { Box } from '@mui/system';
import React from 'react';
import GamesForm from '../GamesForm';
import PokemonGame from '../PokemonGame';

export default function PokemonGameContainer({ updateMatch, getSecondCard, getFirstCard, updateSelectCard, updateFirstUrl, updateSecondUrl, selectCard, pokeball }) {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row'},
      justifyContent: { sm: 'space-around' },
      minWidth: { sm: 600, md: 800 },
      alignItems: 'center'
    }}>
      <GamesForm 
      pokeball={pokeball}
      updateSelectCard={updateSelectCard}
      updateFirstUrl={updateFirstUrl}
      updateSecondUrl={updateSecondUrl}
      updateMatch={updateMatch}
      ></GamesForm>
      <PokemonGame 
      pokeball={pokeball}
      selectCard={selectCard}
      updateFirstUrl={updateFirstUrl}
      updateSecondUrl={updateSecondUrl}
      updateSelectCard={updateSelectCard} 
      getFirstCard={getFirstCard}
      getSecondCard={getSecondCard}
      />
    </Box>
  )
}
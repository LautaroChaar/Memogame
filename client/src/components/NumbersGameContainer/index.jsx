import { Box } from '@mui/material';
import React from 'react';
import GamesForm from '../GamesForm';
import NumbersGame from '../NumbersGame';

export default function NumbersGameContainer( { updateUncoverNumber, uncoverNumber } ) {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row'},
      justifyContent: { sm: 'space-around' },
      minWidth: { sm: 600, md: 800 },
      alignItems: 'center'
    }}>
      <GamesForm  
      updateUncoverNumber={updateUncoverNumber} 
      />
      <NumbersGame
      updateUncoverNumber={updateUncoverNumber} 
      uncoverNumber={uncoverNumber} 
      />
    </Box>
  )
}
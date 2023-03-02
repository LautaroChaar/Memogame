import { Box } from '@mui/system';
import React from 'react';
import { dataContext } from '../../context/DataContext';
import BtnNumbers from '../BtnNumbers';

export default function NumbersGame({ updateUncoverNumber, uncoverNumber }) {

  const[sortArray, setSortArray] = React.useState([]);
  const { newElements } = React.useContext(dataContext);

  React.useEffect( () => {
    setSortArray(newElements.sort(() => Math.random() - 0.5));
  }, [newElements]);

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      maxWidth: 200
    }}>
      { sortArray.map( n => (
        <BtnNumbers 
        key={n} 
        id={n} 
        value={n} 
        updateUncoverNumber={updateUncoverNumber} 
        uncoverNumber={uncoverNumber} />
      )) }
    </Box>
  )
}


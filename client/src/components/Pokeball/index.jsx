import { Box } from '@mui/system';
import React from 'react';
import './Pokeball.css';

export default function Pokeball( {  getSecondCard, getFirstCard, updateSelectCard, updateFirstUrl, updateSecondUrl, image, id, selectCard } ) {

  const card = React.useRef(null);
  const pokeImage = React.useRef(null);
  
  const handleOnClickCard = () => {
    selectCard === 0 && selectFirstCard();
    selectCard === 1 && selectSecondCard();
  }

  const selectFirstCard = () => {
    if (!card.current.classList.contains('rotate')){
      card.current.classList.add('rotate');
      card.current.classList.add('fisrtCard');
      pokeImage.current.classList.add('firstImg');
      updateFirstUrl(pokeImage.current.src);
      getFirstCard(card.current);
      updateSelectCard(selectCard);
    }
  }

  const selectSecondCard = () => {
    if (!card.current.classList.contains('rotate')){
      card.current.classList.add('rotate');
      card.current.classList.add('fisrtCard');
      pokeImage.current.classList.add('secondImg');
      updateSecondUrl(pokeImage.current.src);
      getSecondCard(card.current);
      updateSelectCard(selectCard);
    }
  }

  return (
    <Box className='cardGame' id={id} ref={card} onClick={ () => { handleOnClickCard() } } >
      <Box className='frontCard' >
        <img src='' alt='' className='pokeballImg' />
      </Box>
      <Box className='backCard' >
        <img src={`${image}`} alt='' className='pokeImg' ref={pokeImage} />
      </Box>
    </Box>
  )
}

import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { dataContext } from '../../context/DataContext';
import PokemonGameContainer from '../PokemonGameContainer';

export default function PokemonSection() {

  const [pokeball, setPokeball] = React.useState([]);
  const [selectCard, setSelectCard] = React.useState(0);
  const [firstUrl, setFirstUrl] = React.useState(null);
  const [secondUrl, setSecondUrl] = React.useState(null);
  const [firstCard, setFirstCard] = React.useState(null);
  const [secondCard, setSecondCard] = React.useState(null);
  const [match, setMatch] = React.useState(0);

  const { updateDisableSelect, dataUser, dificulty, getDataUser, validateLoading, isLogged, newElements, startGame, deleteElements, updateMistakes, mistakes } = React.useContext(dataContext);
  
  const navigate = useNavigate();
  
  const getFirstCard = firstCard => {
    setFirstCard(firstCard);
  }

  const getSecondCard = secondCard => {
    setSecondCard(secondCard);
  }

  const updateSelectCard = selectCard => {
    setSelectCard(selectCard + 1);
  }
  
  const updateMatch = match => {
    setMatch(match + 1)
  } 

  const updateFirstUrl = firstUrl => {
    setFirstUrl(firstUrl);
  }
  
  const updateSecondUrl = secondCard => {
    setSecondUrl(secondCard);
  }

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

  React.useEffect(() => {
    const getPokemons = () => {
      const arr = newElements.map( async (item) => 
        await fetch(`https://pokeapi.co/api/v2/pokemon/${item}`)
        .then( res => res.json())
        .then( data => data.sprites.other.dream_world.front_default)
      );
      arr.sort(() => Math.random() - 0.5);
      return arr;
    }
    try {
      const promise = getPokemons();
      Promise.all(promise).then((results) => setPokeball(results));
    } catch (error) {
      console.log(error);
    }
  }, [ newElements]);

  React.useEffect(() => {
    const validateSuccess = () => {
      if (firstUrl !== secondUrl) {    
        setTimeout(() => {
          secondCard.classList.remove("rotate");
          secondCard.classList.remove("secondCard");
          firstCard.classList.remove("rotate");
          firstCard.classList.remove("firstCard");
          updateSelectCard(-1);
          updateFirstUrl(null);
          updateSecondUrl(null);
          updateMistakes(mistakes);
        }, 800);
      } else {
        updateSelectCard(-1);
        updateFirstUrl(null);
        updateSecondUrl(null);
        updateMatch(match);
      } 
    }
    if (secondUrl !== null && secondCard !== null) {
      validateSuccess()
    }
  }, [firstUrl, secondUrl, firstCard, secondCard, match, mistakes, updateMistakes]);

  React.useEffect( () => {
    const setScore = async () => {
      let dif;

      if (dificulty === 'Easy') {
        dif = { ...dataUser.games[0]['pokemon'], easy: Number(dataUser.games[0]['pokemon'].easy) + 1 };
      } else if (dificulty === 'Medium') {
        dif = { ...dataUser.games[0]['pokemon'], medium: Number(dataUser.games[0]['pokemon'].medium) + 1 };
      } else {
        dif = { ...dataUser.games[0]['pokemon'], hard: Number(dataUser.games[0]['pokemon'].hard) + 1 };
      }

      const data = {
        email : dataUser.email,
        trophies : Number(dataUser.trophies) + 1,
        games: [{pokemon: dif}, { ...dataUser.games[1]}]
      }

      const response = await fetch(`${process.env.REACT_APP_URL_API}/api/score/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
  
      const content = response.json();
      Promise.resolve(content).then((results) => getDataUser(results));
    }
    
    const endPokemonGame = () => {
      startGame(false);
      deleteElements();
      updateMatch(-1);
      updateMistakes(-1);
      updateDisableSelect(false);
    }
    
    const alertWinPokemon = () => {
      setTimeout(function () {
        Swal.fire({
          title: 'Victory :D',
          html: `
          <p style='color: #b7b7b7; font-weight: bold;' class="scoreTitle">You won a trophy. Congrats!</p>
          `,
          color: '#e6d839',
          imageUrl: './happyPikachu.jpg',
          background: '#242424',
          confirmButtonText: 'Close',
          confirmButtonColor: '#2a2731'
        });
        setScore();
        endPokemonGame();
      }, 500); 
    }

    const defeatAlert = () => {
      setTimeout(function () {
        Swal.fire({
          title: 'Defeat :(',
          html:`
          <p style='color: #b7b7b7; font-weight: bold;' class="scoreTitle">Don't give up and try again. Good luck!</p>
          `,
          color: '#AD343E',
          imageUrl: './sadPikachu.jpg',
          background: '#242424',
          confirmButtonText: 'Close',
          confirmButtonColor: '#2a2731'
        });
        endPokemonGame();
      }, 500);
    }

    if ( match > 0 && match === (newElements.length / 2) ) alertWinPokemon();
    if ( mistakes === 3 && dificulty === 'Easy' ) defeatAlert();
    if ( mistakes === 6 && dificulty === 'Medium' ) defeatAlert();
    if ( mistakes === 10 && dificulty === 'Hard' ) defeatAlert();
  }, [ match, newElements, deleteElements, startGame, getDataUser, dataUser, dificulty, mistakes, updateMistakes, updateDisableSelect ]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      minHeight: { xs: 'calc(100vh - 172px)', sm: 'calc(100vh - 156px)', md: 'calc(100vh - 164.5px)'},
      backgroundColor: '#f5f5dc',
    }}>
      <Typography variant='h1' sx={{ 
        fontFamily:'Ubuntu, sans-serif', 
        fontSize: {xs: '1.2rem', sm: '1.5rem', md: '2rem'}, 
        fontWeight: 'bold', 
        color: '#BA5F62' }} 
        >
          Pokememo
      </Typography>
      <PokemonGameContainer 
      pokeball={pokeball}
      selectCard={selectCard}
      firstUrl={firstUrl}
      secondUrl={secondUrl}
      updateFirstUrl={updateFirstUrl}
      updateSecondUrl={updateSecondUrl}
      updateSelectCard={updateSelectCard} 
      getFirstCard={getFirstCard}
      firstCard={firstCard}
      getSecondCard={getSecondCard}
      secondCard={secondCard}
      updateMatch={updateMatch}
      />
      <Typography variant='p' sx={{
				color: '#242424',
				fontSize: {xs: '1rem', sm: '1.2rem', md: '1.5rem'}
			}} ><Typography variant='p' sx={{ fontSize: {xs: '1.2rem', sm: '1.5rem', md: '2rem'}, marginRight: {md: '6px'} , color: '#AD343E'}} > Mistakes: </Typography> {mistakes}</Typography>
    </Box>
  )
} 


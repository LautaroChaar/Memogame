import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { dataContext } from '../../context/DataContext';
import NumbersGameContainer from '../NumbersGameContainer';

export default function NumberSection() {

  const [uncoverNumber, setUncoverNumber] = React.useState(0);

  const updateUncoverNumber = (uncoverNumber) => {
    setUncoverNumber(uncoverNumber + 1);
  }

  const { updateDisableSelect, getDataUser, validateLoading, isLogged, newElements, startGame, deleteElements, dataUser, dificulty, mistakes, updateMistakes } = React.useContext(dataContext);
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

  React.useEffect( () => {
    const setScore = async () => {
      let dif;

      if (dificulty === 'Easy') {
        dif = { ...dataUser.games[1]['numbers'], easy: Number(dataUser.games[1]['numbers'].easy) + 1 };
      } else if (dificulty === 'Medium') {
        dif = { ...dataUser.games[1]['numbers'], medium: Number(dataUser.games[1]['numbers'].medium) + 1 };
      } else {
        dif = { ...dataUser.games[1]['numbers'], hard: Number(dataUser.games[1]['numbers'].hard) + 1 };
      }

      const data = {
        email : dataUser.email,
        trophies : Number(dataUser.trophies) + 1,
        games: [{ ...dataUser.games[0]}, {numbers: dif}]
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
      
    const endNumbersGame = () => {
      startGame(false);
      deleteElements();
      updateUncoverNumber(-1);
      updateMistakes(-1);
      updateDisableSelect(false);
    }

    const defeatAlert = () => {
      setTimeout(function () {
        Swal.fire({
          title: 'Defeat :(',
          html:`
          <p style='color: #b7b7b7; font-weight: bold;' class="scoreTitle">Don't give up and try again. Good luck!</p>
          `,
          color: '#AD343E',
          imageUrl: './defeat.jpg',
          background: '#242424',
          confirmButtonText: 'Close',
          confirmButtonColor: '#2a2731'
        });
        endNumbersGame();
      }, 800);
    }

    const alertWinNumbers = () => {
      setTimeout(function () {
        Swal.fire({
          title: 'Victory :D',
          html: `
          <p style='color: #b7b7b7; font-weight: bold;' class="scoreTitle">You won a trophy. Congrats!</p>
          `,
          color: '#e6d839',
          imageUrl: './victory.jpg',
          background: '#242424',
          confirmButtonText: 'Close',
          confirmButtonColor: '#2a2731'
        });
        endNumbersGame();
        setScore();
      }, 500);
    }

    if ( uncoverNumber > 0 && uncoverNumber === newElements.length ) alertWinNumbers();
    mistakes === 5 && defeatAlert();
  }, [uncoverNumber, newElements, deleteElements, startGame, dataUser, dificulty, getDataUser, mistakes, updateMistakes, updateDisableSelect ]);

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
          Numbers
      </Typography>
      <NumbersGameContainer 
      updateUncoverNumber={updateUncoverNumber} 
      uncoverNumber={uncoverNumber}
      />
      <Typography variant='p' sx={{
				color: '#242424',
				fontSize: {xs: '1rem', sm: '1.2rem', md: '1.5rem'}
			}} ><Typography variant='p' sx={{ fontSize: {xs: '1.2rem', sm: '1.5rem', md: '2rem'}, marginRight: {md: '6px'} , color: '#AD343E'}} > Mistakes: </Typography> {mistakes}</Typography>
    </Box>
  )
} 
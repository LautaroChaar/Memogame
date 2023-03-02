import { Button } from '@mui/material';
import React from 'react';
import { dataContext } from '../../context/DataContext';

export default function BtnNumbers({ id, value, updateUncoverNumber, uncoverNumber }) {

  const [btnValue, setBtnValue] = React.useState(value);
  const [success, setSuccess] = React.useState(false);
  const { dificulty, updateMistakes, mistakes } = React.useContext(dataContext);
  const btnRef = React.useRef(null);

  React.useEffect( () => {
    setSuccess(true);
    if (dificulty === "Easy") {
      setTimeout(() => {
        setBtnValue(' ');
        setSuccess(false);
      }, 4000);
    } else if (dificulty === "Medium") {
      setTimeout(() => {
        setBtnValue(' ');
        setSuccess(false);
      }, 7000);
    } else {
      setTimeout(() => {
        setBtnValue(' ');
        setSuccess(false);
      }, 11000);
    }
  }, [dificulty]);

  const handleNumbersBtnClick = () => {
    btnRef.current.style.backgroundColor = 'transparent';
    uncover();
    setBtnValue(id);
  }

  const uncover = () => {
    if (uncoverNumber + 1 === id) {
      updateUncoverNumber(uncoverNumber);
      setSuccess(true);
    } else {
      updateMistakes(mistakes);
      btnRef.current.style.color = '#AD343E';
      setTimeout(function () {
        btnRef.current.style.backgroundColor = '#242424';
        btnRef.current.style.color = '#242424';
        setBtnValue(' ');
      }, 800);
    }
  }

  return (
    <Button 
    sx={{
      ':disabled': {
        backgroundColor: 'transparent',
        color: '#242424'
      },
      color: '#242424',
      backgroundColor: '#242424',
      border: '1px solid #242424',
      fontWeight: 'bolder',
      fontFamily:'Ubuntu, sans-serif',
      my: 1,
      mx: 1,
      fontSize: '1.2rem',
      minHeight: 48,
      minWidth: 50,
      '&:hover': { backgroundColor: '#2424249e'},
    }}
    
    id={id}
    ref={btnRef}
    onClick={ () => { handleNumbersBtnClick() }} 
    disabled={ success ? true : false} > 
    {btnValue} 
    </Button>
  )
}
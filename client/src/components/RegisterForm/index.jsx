import { Box, Typography } from '@mui/material';
import Button from "@mui/material/Button";
import React from "react";
import { Link, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { dataContext } from '../../context/DataContext';
import FormInput from '../FormInput';
import './RegisterForm.css';

export default function RegisterForm() {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { userLoggedIn, isLogged } = React.useContext(dataContext);

  async function handleClickRegister() {
    const user = {
      name,
      email,
      password
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_URL_API}/api/register`, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const content = await response.json();
      const { token } = content;
      token && localStorage.setItem('access_token', token);
      localStorage.setItem('isLogged', true);
      localStorage.setItem('user', email);
      userLoggedIn()
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Ups :(',
        html:`
        <p style='color: #b7b7b7; font-weight: bold;' class="scoreTitle">User already exist.</p>
        `,
        color: '#AD343E',
        background: '#242424',
        confirmButtonText: 'Close',
        confirmButtonColor: '#2a2731'
      });
    }
  }

  const registerFormConditions = name !== "" && email !== "" && password !== "";

  const validateRegister = () => { 
    if (registerFormConditions) handleClickRegister();
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '20px'
    }}>
      <Typography variant="h1" sx={{  fontFamily:'Ubuntu, sans-serif', fontSize: {xs: '1.2rem', sm: '1.5rem', md: '2rem'}, margin: '10px', fontWeight: 'bold', color: '#BA5F62' }}>
        Register
      </Typography>
      <form className="registerForm" >
        <FormInput
          label="Username"
          type="text"
          placeholder="Username"
          onChange={setName}
          validationRegex={/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/}
        />
        <Typography variant='p' sx={{
          fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.9rem' }
        }}>Must contain 8-20 characters long characters</Typography>
        <FormInput
          label="Email"
          type="email"
          placeholder="Example@example.com"
          onChange={setEmail}
          validationRegex={/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
        />
        <FormInput
          label="Password"
          type="password"
          placeholder="************"
          onChange={setPassword}
          validationRegex={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/}
        />
        <Typography variant='p' sx={{
          fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.9rem' }
        }}>Must contain minimum eight characters, at least one letter and one number</Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}>
          <Button 
          sx={{
            width: 'fit-content',
            background: 'none',
            marginTop: '20px',
            color: '#000',
            '&:hover': { backgroundColor: 'transparent'}
          }} 
          type="button"
          onClick={validateRegister}>
          { isLogged ? <Navigate to={'/home'} className='linkRegisterSection' >Sign up</Navigate> : <Link to={''} className='linkRegisterSection' >Sign up</Link> }
          </Button>
          <Button 
          sx={{
            width: 'fit-content',
            background: 'none',
            marginTop: '20px',
            color: '#000',
            '&:hover': { backgroundColor: 'transparent'}
          }} 
          type="button">
            <Link to={'/login'} className='linkRegisterSection' >Sign in</Link>  
          </Button>
        </Box>
      </form>
    </Box>
  );
}







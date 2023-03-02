import { Box, Typography } from '@mui/material';
import Button from "@mui/material/Button";
import React from "react";
import { Link, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { dataContext } from '../../context/DataContext';
import FormInput from '../FormInput';
import './LoginForm.css';

export default function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { userLoggedIn, isLogged } = React.useContext(dataContext);

  async function handleClickLogin() {
    const user = {
      email,
      password
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_URL_API}/api/login`, {
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
      localStorage.setItem('user', email);
      localStorage.setItem('isLogged', true);
      userLoggedIn()
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Ups :(',
        html:`
        <p style='color: #b7b7b7; font-weight: bold;' class="scoreTitle">Invalid credentials</p>
        `,
        color: '#AD343E',
        background: '#242424',
        confirmButtonText: 'Close',
        confirmButtonColor: '#2a2731'
      });
    }
  }

  const loginFormConditions = email !== "" && password !== "";

  const validateLogin = () => { 
    if (loginFormConditions) handleClickLogin();
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '20px'
    }}>
      <Typography variant="h1" sx={{ fontFamily:'Ubuntu, sans-serif', fontSize: {xs: '1.2rem', sm: '1.5rem', md: '2rem'}, margin: '10px', fontWeight: 'bold', color: '#BA5F62' }} >
        Login
      </Typography>
      <form className="loginForm" >
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
          onClick={validateLogin}>
          { isLogged ? <Navigate to={'/home'} className='linkLoginSection' >Sign in</Navigate> : <Link to={''} className='linkLoginSection' >Sign in</Link> }
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
            <Link to={'/register'} className='linkLoginSection' >Sign up</Link>  
          </Button>
        </Box>
      </form>
    </Box>
  );
}
import { Box } from '@mui/material';
import React from "react";
import LoginForm from "../LoginForm";

export default function Login() {

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#f5f5dc',
      minHeight: {xs: 'calc(100vh - 172px)', sm: 'calc(100vh - 156px)'}
    }}>
      <LoginForm/>
    </Box>
  );
}
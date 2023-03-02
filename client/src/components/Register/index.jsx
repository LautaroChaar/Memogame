import { Box } from "@mui/material";
import React from "react";
import RegisterForm from "../RegisterForm";

export default function Register() {

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#f5f5dc',
      minHeight: {xs: 'calc(100vh - 172px)', sm: 'calc(100vh - 156px)'}
    }}>
      <RegisterForm/>
    </Box>
  );
}
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Typography } from '@mui/material';
import React from 'react';

export default function Footer() {
  
	return (
	<footer>
		<Box sx={{
			display: 'flex',
			flexDirection: {xs: 'column', sm: 'row'},
			justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#242424',
			borderTop: '2px solid #b7b7b7',
      padding: '20px'
		}} >
			<Typography variant='p' sx={{
				color: {xs: '#b7b7b7', md: '#b7b7b7'},
        m: 2,
				fontWeight: 'bold'
			}}>Created by Lautaro Chaar</Typography>
			<Box >
				<a referrerPolicy='noreferrer' rel='noreferrer' href='https://github.com/LautaroChaar' target='_blank' ><GitHubIcon sx={{display: 'block', color: '#b7b7b7', '&:hover': {color: '#f5f5dc'}}} /></a>
			</Box>
		</Box>
	</footer>
  )
}

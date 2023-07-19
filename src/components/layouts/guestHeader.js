import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';

const GuestHeader = () => {
  return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', px: 2, gap: 1 }}>
      <Stack direction="row" spacing={2} letterSpacing={1}>
        <IconButton color="inherit" component={Link} to="/">
          Home
        </IconButton>
        <IconButton color="inherit" component={Link} to="/sign-in">
          Sign In
        </IconButton>
        <IconButton color="inherit" component={Link} to="/sign-up">
          Sign Up
        </IconButton>
      </Stack>
    </Box>
  );
};

export default GuestHeader;

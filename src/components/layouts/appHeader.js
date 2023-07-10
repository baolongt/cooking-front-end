import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { EdgeTrigger } from '@mui-treasury/layout';
import Menu from '@mui/icons-material/Menu';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';

const AppHeader = () => {
  return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', px: 2, gap: 1 }}>
      <EdgeTrigger target={{ anchor: 'left', field: 'open' }}>
        {(open, setOpen) => (
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowLeft /> : <Menu />}
          </IconButton>
        )}
      </EdgeTrigger>
      <Stack direction="row" spacing={2} letterSpacing={1}>
        <IconButton color="inherit" component={Link} to="/">
          Home
        </IconButton>
        <IconButton color="inherit" component={Link} to="/meals">
          Meals
        </IconButton>
      </Stack>
    </Box>
  );
};

export default AppHeader;

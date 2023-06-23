import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { EdgeTrigger } from '@mui-treasury/layout';
import Menu from '@mui/icons-material/Menu';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import Header from '../blogs/Header.js';
import { sections } from '../../mock-data/index.js';
import { Link } from 'react-router-dom';

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
      <Header title="Blog" sections={sections} />
      <Box>
        <IconButton color="inherit" component={Link} to="/signin">
          Signin
        </IconButton>
        <IconButton color="inherit" component={Link} to="/signup">
          Signup
        </IconButton>
      </Box>
    </Box>
  );
};

export default AppHeader;

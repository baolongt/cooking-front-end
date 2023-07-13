import { List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const AppSidebar = () => {
  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accountID');
    window.location.reload();
  };
  return (
    <List>
      <Link
        to={`/users/${localStorage.getItem('accountID')}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <ListItem>
          <ListItemButton
            color="neutral"
            disabled={false}
            selected={false}
            variant="plain"
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            Account
          </ListItemButton>
        </ListItem>
      </Link>
      <ListItem onClick={onLogout}>
        <ListItemButton
          color="neutral"
          disabled={false}
          selected={false}
          variant="plain"
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default AppSidebar;

import { List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const AppSidebar = () => {
  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accountID');
    localStorage.removeItem('role');
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

      {localStorage.getItem('role') === 'US' ? (
        <Link
          to={'/orders'}
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
                <ShoppingCartIcon />
              </ListItemIcon>
              Orders
            </ListItemButton>
          </ListItem>
        </Link>
      ) : (
        <></>
      )}

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

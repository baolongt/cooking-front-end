import { Home, KeyboardArrowRightOutlined } from '@mui/icons-material';
import { List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import React from 'react';

const AppSidebar = () => {
  return (
    <List>
      <ListItem>
        <ListItemButton
          color="neutral"
          disabled={false}
          selected={false}
          variant="plain"
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          Account
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default AppSidebar;

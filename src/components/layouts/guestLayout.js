/* eslint-disable react/prop-types */
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Root, Header, Content } from '@mui-treasury/layout';
import { Grid, Toolbar } from '@mui/material';
import GuestHeader from './guestHeader.js';

export const GuestLayout = (props) => {
  return (
    <Root
      scheme={{
        header: {
          config: {
            xs: {
              position: 'sticky',
              height: 56,
            },
            md: {
              position: 'relative',
              height: 64,
              clipped: true,
            },
          },
        },
      }}
    >
      <CssBaseline />
      <Header>
        <Toolbar>
          <GuestHeader />
        </Toolbar>
      </Header>
      <Content>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {props.children}
          </Grid>
        </Grid>
      </Content>
    </Root>
  );
};

export default GuestLayout;

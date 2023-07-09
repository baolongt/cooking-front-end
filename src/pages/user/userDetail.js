/* eslint-disable react/prop-types */
import { Grid, Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../apis/user/getAll';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
}));

const UserDetail = (props) => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(['users', id], () =>
    getUserById(id)
  );
  const classes = useStyles();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  const { userName, roleID, email, phone } = data;

  return (
    <Container maxWidth="sm" className={classes.container}>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.field}>
            <Typography variant="h6">Username</Typography>
            <Typography>{userName}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.field}>
            <Typography variant="h6">Role ID</Typography>
            <Typography>{roleID}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.field}>
            <Typography variant="h6">Email</Typography>
            <Typography>{email}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.field}>
            <Typography variant="h6">Phone</Typography>
            <Typography>{phone}</Typography>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default UserDetail;

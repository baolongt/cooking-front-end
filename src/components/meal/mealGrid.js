/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, Typography } from '@mui/material';
import MealCard from './mealCard';

const MealGrid = (props) => {
  const { data, isLoading, error } = props;
  console.log('mealgrid', data);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {data &&
        data.map(({ mealID, description, price, recipe, accountID }, index) => (
          <Grid item lg={3} key={index}>
            <MealCard
              mealID={mealID}
              description={description}
              price={price}
              recipe={recipe}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default MealGrid;

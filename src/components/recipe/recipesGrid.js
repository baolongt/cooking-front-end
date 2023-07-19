/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, Typography } from '@mui/material';
import RecipeCard from '../recipeCard';

const RecipesGrid = (props) => {
  const { data, isLoading, error } = props;

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {data &&
        data.map((recipe) => (
          // <li key={(recipe.accountID, recipe.recipeID)}>{recipe.recipeName}</li>
          <Grid item lg={3} key={(recipe.accountID, recipe.recipeID)}>
            <RecipeCard recipe={recipe} />
          </Grid>

          // <RecipeCard key={recipe.accountID, recipe.recipeID} />
        ))}
    </Grid>
  );
};

export default RecipesGrid;

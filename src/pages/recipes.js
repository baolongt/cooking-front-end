import { Typography } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { listRecipes } from '../apis/recipe/listRecipes';
import RecipesGrid from '../components/recipe/recipesGrid';

const Recipes = () => {
  const { data, isLoading, error } = useQuery('recipes', () => listRecipes());

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return <RecipesGrid data={data} />;
};

export default Recipes;

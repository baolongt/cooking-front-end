import { Button, Typography } from '@mui/material';
import React from 'react';
import RecipesTable from '../../components/recipe/recipesTable';

const ModPage = () => {
  return (
    <>
      <Typography
        sx={{
          marginTop: 1,
          marginLeft: 5,
        }}
        variant="h4"
      >
        Recipes
      </Typography>
      <RecipesTable />
    </>
  );
};

export default ModPage;

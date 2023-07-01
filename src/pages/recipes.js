import React from 'react';
import { useQuery } from 'react-query';
import { listRecipes } from '../apis/listRecipes';
import RecipesGrid from '../components/recipe/recipesGrid';

const Recipes = () => {
  const { data, isLoading, error } = useQuery('recipes', () => listRecipes());

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return <RecipesGrid data={data} />;
};

export default Recipes;

import React from 'react';
import { useQuery } from 'react-query';
import { listRecipes } from '../apis/listRecipes';

const Recipes = () => {
  const { data, isLoading, error } = useQuery('recipes', () => listRecipes());

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <ul>
      {data && data.map((recipe) => <li key={recipe.id}>{recipe.title}</li>)}
    </ul>
  );
};

export default Recipes;

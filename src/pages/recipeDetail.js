import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { getRecipe } from '../apis/getRecipe';

const RecipeDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery('recipe', () => getRecipe(id));

  useEffect(() => {
    console.log(data);
    console.log(isLoading);
    console.log(error);
  }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  const { recipeDetails } = data;

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: '0.5rem',
        marginLeft: '10rem',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
        }}
      >
        {data.recipeName}
      </Typography>
      <div className="title-small">
        <span>Written By {data.account.username}</span>
        <span>Created On {data.createDate}</span>
      </div>
      <img
        src={data.recipeImage}
        className="image-recipe"
        style={{
          width: '35%',
          height: '50%',
        }}
      />
      <p
        style={{
          width: '50%',
        }}
      >
        {data.description}
      </p>
      <div className="ingredient">
        <h2>Ingredients</h2>
        {recipeDetails.map((recipe, index) => (
          <li
            key={index}
          >{`${recipe.ingredient.ingredientName} ${recipe.quantity} ${recipe.unit}`}</li>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetail;

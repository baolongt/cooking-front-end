import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { getRecipe } from '../apis/recipe/getRecipe';
import { makeStyles } from '@mui/styles';
import { convert } from 'html-to-text';
import { Link as ReouterLink } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'left',
    height: '100vh',
    gap: '0.5rem',
  },
  image: {
    width: '100%',
    height: '50%',
  },
  p: {
    width: '100%',
  },
  ingredient: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  description: {
    width: '100%',
  },
}));

const RecipeDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(['recipes', id], () =>
    getRecipe(id)
  );
  const classes = useStyles();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  const {
    recipeDetails,
    description,
    recipeImage,
    account: { accountID, userName },
  } = data;

  return (
    <div className={classes.root}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
        }}
      >
        {data.recipeName}
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined">Add to wishlist</Button>
        <ReouterLink to={`/recipes/${id}/edit`}>
          <Button variant="outlined">Edit</Button>
        </ReouterLink>
        <Button variant="outlined">Delete</Button>
      </Stack>
      <Stack spacing={2}>
        <span>
          Written By <Link to={`/users/${accountID}`}>{userName}</Link>
        </span>

        <span>Created On {data.createDate.split('T')[0]}</span>
        <img src={recipeImage} className={classes.image} />
        <Box className={classes.description}>{convert(description)}</Box>
        <div className={classes.ingredient}>
          <h2>Ingredients</h2>
          {recipeDetails.map((recipe, index) => (
            <li
              key={index}
            >{`${recipe.ingredient.ingredientName} ${recipe.quantity} ${recipe.unit}`}</li>
          ))}
        </div>
      </Stack>
    </div>
  );
};

export default RecipeDetail;

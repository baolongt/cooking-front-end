import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { getRecipe } from '../apis/recipe/getRecipe';
import { makeStyles } from '@mui/styles';
import { convert } from 'html-to-text';
import { Link as ReouterLink } from 'react-router-dom';
import DeleteModal from '../components/recipe/deleteModal';
import { deleteRecipe } from '../apis/recipe/recipeDelete';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(['recipes', id], () =>
    getRecipe(id)
  );
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { mutate } = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      toast.success('Recipe deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const classes = useStyles();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleConfirmDelete = () => {
    mutate(id);
  };

  const {
    recipeDetails,
    description,
    recipeImage,
    account: { accountID, userName },
    isOwner,
    meal,
    recipeID,
  } = data;

  const handleClickMealButton = () => {
    if (meal) {
      navigate(`/meals/${meal.mealID}`);
    } else {
      navigate(`/meals/add/${recipeID}`);
    }
  };

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
        {isOwner ? (
          <>
            <Button variant="outlined" onClick={handleClickMealButton}>
              Meal
            </Button>
            <ReouterLink to={`/recipes/${id}/edit`}>
              <Button variant="outlined">Edit</Button>
            </ReouterLink>
            <Button variant="outlined" onClick={handleDeleteOpen} color="error">
              Delete
            </Button>
          </>
        ) : (
          <Button variant="outlined">Add to wishlist</Button>
        )}
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
        <DeleteModal
          open={deleteOpen}
          handleClose={handleDeleteClose}
          handleConfirm={handleConfirmDelete}
        />
      </Stack>
    </div>
  );
};

export default RecipeDetail;

import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { getRecipe } from '../../apis/recipe/getRecipe';
import { makeStyles } from '@mui/styles';
import { convert } from 'html-to-text';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DenyModal from '../../components/recipe/denyModal';
import { denyRecipe } from '../../apis/mod/denyRecipe';
import { approveRecipe } from '../../apis/mod/approveRecipe';

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

const PreviewRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(['modRecipes', id], () =>
    getRecipe(id)
  );
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { mutate: accept } = useMutation({
    mutationFn: approveRecipe,
    onSuccess: () => {
      toast.success('success');
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate: deny } = useMutation({
    mutationFn: denyRecipe,
    onSuccess: () => {
      toast.success('success');
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const classes = useStyles();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleConfirmDeny = () => {
    deny(id);
  };

  const handleApprove = () => {
    accept(id);
  };

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
        <Button variant="outlined" onClick={handleApprove} color="success">
          Approve
        </Button>
        <Button variant="outlined" onClick={handleDeleteOpen} color="error">
          Deny
        </Button>
      </Stack>
      <Stack spacing={2}>
        <span>
          Written By <Link to={`/users/${accountID}`}>{userName}</Link>
        </span>

        <span>Created On {data.createDate.split('T')[0]}</span>
        <img src={recipeImage} className={classes.image} />
        <Box className={classes.description}>{convert(description)}</Box>
        <Divider />
        <div className={classes.ingredient}>
          <Typography variant="h5">Ingredients</Typography>
          {recipeDetails.map((recipe, index) => (
            <li
              key={index}
            >{`${recipe.ingredient.ingredientName} ${recipe.quantity} ${recipe.unit}`}</li>
          ))}
        </div>
        <DenyModal
          open={deleteOpen}
          handleClose={handleDeleteClose}
          handleConfirm={handleConfirmDeny}
        />
      </Stack>
    </div>
  );
};

export default PreviewRecipe;

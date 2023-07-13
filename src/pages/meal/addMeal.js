import React from 'react';
import { Stack, TextField, Button, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { getRecipe } from '../../apis/recipe/getRecipe';
import { addMeal } from '../../apis/meal/addMeal';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  price: yup.number().positive().required(),
  description: yup.string().required(),
});

const queryClient = new QueryClient();

const AddMeal = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(['recipes', id], () =>
    getRecipe(id)
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: 0,
      description: '',
    },
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: addMeal,
    onSuccess: () => {
      toast.success('Meal created successfully');
      queryClient.invalidateQueries('meals');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    mutate({
      ...data,
      recipeID: id,
    });
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  const { recipeName } = data;

  return (
    <Grid style={{ marginTop: '20px' }} container spacing={2}>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" component="h4">
            Create meal for {recipeName ?? ''}
          </Typography>
          <TextField
            label="Price"
            variant="outlined"
            type="number"
            fullWidth
            {...register('price')}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AddMeal;

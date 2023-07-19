import * as React from 'react';
import { useMutation } from 'react-query';
import { TextField, Button, Box } from '@mui/material';
import { createIngredient } from '../../apis/ingredient/ingredient';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  ingredientName: yup.string().required('Ingredient name is required'),
});

export default function IngredientAddForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createIngredientMutation, { isLoading, isError, isSuccess }] =
    useMutation(createIngredient);

  const onSubmit = (data) => {
    createIngredientMutation(data);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ maxWidth: 400 }}
      >
        <TextField
          label="Ingredient Name"
          variant="outlined"
          margin="normal"
          fullWidth
          {...register('ingredientName')}
          error={!!errors.ingredientName}
          helperText={errors.ingredientName?.message}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading || isSuccess}
          fullWidth
        >
          Create
        </Button>

        {isError && <span>Error creating ingredient</span>}
        {isSuccess && <span>Ingredient created successfully!</span>}
      </Box>
    </Box>
  );
}

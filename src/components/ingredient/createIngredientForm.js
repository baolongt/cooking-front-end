import * as React from 'react';
import { useMutation } from 'react-query';
import { TextField, Button, Box } from '@mui/material';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addIngredient } from '../../apis/ingredient/createIngredient';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  ingredientName: yup.string().required('Ingredient name is required'),
});

export default function IngredientAddForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: addIngredient,
    onSuccess: () => {
      toast.success('order created successfully');
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    mutate(data.ingredientName);
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

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create
        </Button>
      </Box>
    </Box>
  );
}

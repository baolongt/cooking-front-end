/* eslint-disable react/prop-types */
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { Stack, TextField, Button, Rating, Typography } from '@mui/material';
import { addReview } from '../../apis/review/addReview';

const schema = yup.object().shape({
  reviewContent: yup.string().required(),
  rating: yup
    .number()
    .min(1, 'Must be at least 1')
    .max(5, 'Must be at most 5')
    .required(),
});

const AddReview = ({ recipeID }) => {
  const { mutate } = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      toast.success('Review added successfully');
      window.location.reload();
    },
    onError: () => {
      toast.error('Failed to add review');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRating = (event, newValue) => {
    setValue('rating', newValue);
  };

  const onSubmit = (data) => {
    // console.log(data);
    mutate({
      recipeID,
      ...data,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography variant="subtitle1" component="div">
          Rating:
        </Typography>
        <Rating onChange={handleRating} name="rating" />
        {errors.rating && (
          <Typography variant="subtitle1" component="div" color="error">
            {errors.rating.message}
          </Typography>
        )}
        <TextField
          label="Review"
          variant="outlined"
          fullWidth
          {...register('reviewContent')}
          error={!!errors.reviewContent}
          helperText={errors.reviewContent?.message}
        />
        <Button
          style={{ width: '100px' }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default AddReview;

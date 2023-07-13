import React from 'react';
import { Stack, TextField, Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { signin } from '../../apis/account/signin';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const SignIn = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: signin,
    onSuccess: () => {
      navigate('/');
    },
    onError: () => {
      toast.error('Sign in failed');
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    mutate({
      ...data,
    });
  };

  return (
    <Grid style={{ marginTop: '20px' }} container spacing={2}>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" color="primary">
            Sign in
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SignIn;

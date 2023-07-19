import React from 'react';
import { Stack, TextField, Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { signup } from '../../apis/account/signup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  userName: yup.string().required(),
  password: yup.string().min(8).required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
});

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate('/');
    },
    onError: () => {
      toast.error('Sign up failed');
    },
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
            label="Username"
            variant="outlined"
            fullWidth
            {...register('userName')}
            error={!!errors.userName}
            helperText={errors.userName?.message}
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
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            {...register('phone')}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <Button type="submit" variant="contained" color="primary">
            Sign up
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SignUp;

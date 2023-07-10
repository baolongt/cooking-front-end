import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { getMeal } from '../../apis/meal/getMeal';
import { createOrder } from '../../apis/order/createOrder';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  quantity: yup.number().min(1).required(),
  detail: yup.string().required(),
});
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
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

const MealOrder = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(['meal', id], () => getMeal(id));
  const [orderCount, setOrderCount] = useState(0);
  const [detail, setdetail] = useState('');
  const [total, setTotal] = useState(data?.price ?? 0);
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      detail: '',
      quantity: 0,
    },
  });

  const { mutate } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success('order created successfully');
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  const {
    account: { accountID, userName },
    recipe: { recipeName, recipeImage },
    price,
  } = data;

  const handleOrderIncrement = () => {
    setOrderCount(orderCount + 1);
    setTotal(total + price);
    setValue('quantity', orderCount + 1);
  };

  const handleOrderDecrement = () => {
    if (orderCount > 0) {
      setOrderCount(orderCount - 1);
      setTotal(total - price);
      setValue('quantity', orderCount - 1);
    }
  };

  const handledetailChange = (e) => {
    setdetail(e.target.value);
    setValue('detail', e.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
    mutate({
      ...data,
      mealID: id,
      accountID: '87178fa5-da59-42be-b694-38161f1e3f1d',
    });
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.root}
    >
      <Grid xs={8}>
        <Typography variant="h4">{recipeName}</Typography>
        <Typography variant="h5">
          Sell By <Link to={`/users/${accountID}`}>{userName}</Link>
        </Typography>
        <img src={recipeImage} alt="meal" className={classes.image} />
        <Typography variant="h6">Price: ${price}</Typography>
        <Grid container alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleOrderDecrement}
          >
            -
          </Button>
          <TextField
            type="number"
            value={orderCount}
            disabled
            inputProps={{ style: { textAlign: 'center' } }}
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleOrderIncrement}
          >
            +
          </Button>
        </Grid>
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>

        <TextField
          style={{
            marginTop: '10px',
          }}
          id="Detail"
          label="detail"
          defaultValue={detail}
          {...register('detail')}
          onChange={handledetailChange}
          fullWidth
          multiline
          rows={4}
          error={!!errors.detail}
          helperText={errors.detail?.message}
        />
        <Button
          style={{
            marginTop: '10px',
          }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit(onSubmit)}
        >
          Finish Order
        </Button>
      </Grid>
    </Grid>
  );
};

export default MealOrder;

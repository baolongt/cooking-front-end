/* eslint-disable react/prop-types */
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
} from '@mui/material';

export function OrderCard({ order }) {
  const { meal, status, totalPrice, quantity } = order;
  const { recipeName, recipeImage } = meal.recipe;

  let statusColor = 'warning.main';
  let statusText = status.toUpperCase();

  if (status === 'confirm') {
    statusColor = 'success.main';
  } else if (status === 'deny') {
    statusColor = 'error.main';
  }

  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia sx={{ width: 200 }} image={recipeImage} title={recipeName} />
      <CardContent sx={{ flex: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {recipeName}
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body2" color={statusColor}>
            {statusText}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total price: {totalPrice}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quantity: {quantity}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

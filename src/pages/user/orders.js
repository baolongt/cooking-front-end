import React from 'react';
import { useQuery } from 'react-query';
import { Box, Stack, Typography } from '@mui/material';
import { OrderCard } from '../../components/order/OrderCard';
import { listOrdersByAccountId } from '../../apis/order/ListOrdersByAccountId';

const Orders = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery('orders', () => listOrdersByAccountId());

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box sx={{ padding: 5, marginTop: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Orders
      </Typography>

      <Stack spacing={2}>
        {orders.map((order) => (
          <OrderCard key={order.orderID} order={order} />
        ))}
      </Stack>
    </Box>
  );
};

export default Orders;

import { Typography } from '@mui/material';
import React from 'react';
import OrdersTable from '../../components/order/OrderTable';

const OrdersModPage = () => {
  return (
    <>
      <Typography
        sx={{
          marginTop: 1,
          marginLeft: 5,
        }}
        variant="h4"
      >
        Orders
      </Typography>
      <OrdersTable />
    </>
  );
};

export default OrdersModPage;

import * as React from 'react';
import { useQuery } from 'react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { listOrders } from '../../apis/order/listOrdes';
export default function OrdersTable() {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery('modOrders', () => listOrders());

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        maxHeight: '80vh',
        overflow: 'auto',
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Meal Name</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.orderID}>
              <TableCell component="th" scope="row">
                {order.meal && order.meal.recipe
                  ? order.meal.recipe.recipeName
                  : ''}
              </TableCell>
              <TableCell>
                {order.account ? order.account.userName : ''}
              </TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.totalPrice}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

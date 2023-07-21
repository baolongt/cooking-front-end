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
  Button,
} from '@mui/material';
import { listAccounts } from '../../apis/account/listAccount';

export default function AccountsTable() {
  const {
    data: accounts,
    isLoading,
    error,
  } = useQuery('accounts', () => listAccounts());

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
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.accountID}>
              <TableCell component="th" scope="row">
                {account.userName}
              </TableCell>
              <TableCell>{account.email}</TableCell>
              <TableCell>{account.phone}</TableCell>
              <TableCell>
                {account.role.roleName === 'US' && 'User'}
                {account.role.roleName === 'AD' && 'Admin'}
                {account.role.roleName === 'MOD' && 'Moderator'}
              </TableCell>
              <TableCell>{account.status ? 'Active' : 'Inactive'}</TableCell>
              <TableCell>
                <Button color="error">Deactivate</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

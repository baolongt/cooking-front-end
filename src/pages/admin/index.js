import { Typography } from '@mui/material';
import React from 'react';
import AccountsTable from '../../components/account/AccountsTable';

const AdminPage = () => {
  return (
    <>
      <Typography
        sx={{
          marginTop: 1,
          marginLeft: 5,
        }}
        variant="h4"
      >
        Accounts
      </Typography>
      <AccountsTable />
    </>
  );
};

export default AdminPage;

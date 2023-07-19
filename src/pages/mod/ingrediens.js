import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import IngredientsTable from '../../components/ingredient/ingredientsTable';

const IngredientsModPage = () => {
  return (
    <>
      <Typography
        sx={{
          marginTop: 1,
          marginLeft: 5,
        }}
        variant="h4"
      >
        Ingredients
      </Typography>
      <Link to="/add-ingredient">
        <Button
          sx={{
            marginTop: 1,
            marginLeft: 5,
          }}
          variant="outlined"
        >
          Add Ingredient
        </Button>
      </Link>

      <IngredientsTable />
    </>
  );
};

export default IngredientsModPage;

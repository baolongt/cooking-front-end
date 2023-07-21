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
import { listIngredients } from '../../apis/ingredient/listIngredients';
import DeactivateModal from './deactivateIngredientModal';
import { useNavigate } from 'react-router-dom';

export default function IngredientsTable() {
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [ingredientID, setIngredientID] = React.useState('');
  const {
    data: ingredients,
    isLoading,
    error,
  } = useQuery('modIngredients', () => listIngredients());

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  const handleDeleteOpen = (id) => {
    setDeleteOpen(true);
    setIngredientID(id);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleConfirm = () => {
    console.log(ingredientID);
  };

  return (
    <>
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
              <TableCell>Ingredient Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((ingredient) => (
              <TableRow key={ingredient.ingredientID}>
                <TableCell component="th" scope="row">
                  {ingredient.ingredientName}
                </TableCell>
                <TableCell>
                  {ingredient.status ? 'Active' : 'Inactive'}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteOpen(ingredient.ingredientID)}
                    color="error"
                  >
                    Deactivate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeactivateModal
        handleClose={handleDeleteClose}
        handleConfirm={handleConfirm}
      />
    </>
  );
}

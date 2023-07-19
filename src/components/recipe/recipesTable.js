import * as React from 'react';
import { Link } from 'react-router-dom';
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
import { listWaitingRecipes } from '../../apis/recipe/listWaitingRecipe';

export default function RecipesTable() {
  const {
    data: recipes,
    isLoading,
    error,
  } = useQuery('modRecipes', () => listWaitingRecipes());

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
            <TableCell>Recipe Name</TableCell>
            <TableCell>Creator</TableCell>
            <TableCell>Create Date</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow key={recipe.recipeID}>
              <TableCell component="th" scope="row">
                {recipe.recipeName}
              </TableCell>
              <TableCell>
                <Link to={`/users/${recipe.accountID}`}>
                  {recipe.account.userName}
                </Link>
              </TableCell>
              <TableCell>{recipe.createDate.split('T')[0]}</TableCell>
              <TableCell>
                <Link to={`/preview/${recipe.recipeID}`}>
                  <Button>Preview</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import React, { useEffect, useState } from 'react';
import Recipes from '../../pages/recipes.js';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from 'react-query';
import { searchRecipe } from '../../apis/recipe/searchRecipe.js';
import RecipesGrid from '../recipe/recipesGrid.js';
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const AppContent = () => {
  const [isLoginin, setIsLoginin] = useState(false);

  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('accountID')) {
      setIsLoginin(true);
    }
  }, []);

  useEffect(() => {
    if (!isSearch || search !== '') {
      const handler = setTimeout(() => {
        setIsSearch(true);
      }, 1500);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [search]);

  const { data, isLoading, error } = useQuery(
    ['recipes', { recipeName: search }],
    () => {
      setIsSearch(false);
      return searchRecipe(search);
    },
    { enabled: isSearch }
  );

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          margin: '1rem',
        }}
      >
        {isLoginin ? (
          <Link to="/recipes/add">
            <Button variant="outlined">Add new recipe</Button>
          </Link>
        ) : (
          <></>
        )}

        <Input
          sx={{ width: '50%' }}
          id="input-with-icon-adornment"
          placeholder="Search for recipes..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </Stack>

      {search.length === 0 ? (
        <Recipes />
      ) : (
        <RecipesGrid data={data} isLoading={isLoading} error={error} />
      )}
    </>
  );
};

export default AppContent;

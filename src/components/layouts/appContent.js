import React, { useEffect, useState } from 'react';
import Recipes from '../../pages/recipes.js';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from 'react-query';
import { searchRecipe } from '../../apis/searchRecipe.js';
import RecipesGrid from '../recipe/recipesGrid.js';

const AppContent = () => {
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  // const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (!isSearch || search !== '') {
      const handler = setTimeout(() => {
        setIsSearch(true);
        console.log('isSearch: ', isSearch);
      }, 1500);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [search]);

  useEffect(() => {
    console.log('data', data);
  }, [isSearch]);

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          margin: '1rem',
        }}
      >
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
            console.log(search);
          }}
        />
      </div>

      {search.length === 0 ? (
        <Recipes />
      ) : (
        <RecipesGrid data={data} isLoading={isLoading} error={error} />
      )}
    </>
  );
};

export default AppContent;

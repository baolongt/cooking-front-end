import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from 'react-query';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MealGrid from './mealGrid.js';
import { listMeals } from '../../apis/meal/listMeals.js';

const Meals = () => {
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);

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
    ['meals', { mealName: search }],
    () => {
      setIsSearch(false);
      return listMeals(search);
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
        <Input
          sx={{ width: '50%' }}
          id="input-with-icon-adornment"
          placeholder="Search for meals..."
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

      <MealGrid data={data} isLoading={isLoading} error={error} />
    </>
  );
};

export default Meals;

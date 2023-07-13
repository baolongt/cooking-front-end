import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Stack,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  IconButton,
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMutation, useQuery } from 'react-query';
import { createRecipe } from '../../apis/recipe/createRecipe';
import { toast } from 'react-toastify';
import { listIngredients } from '../../apis/ingredient/listIngredients';
import DeleteIcon from '@mui/icons-material/Delete';

const schema = yup.object().shape({
  recipeName: yup.string().required(),
  recipeImage: yup.string().url().required(),
  description: yup.string().required(),
  ingredients: yup.array().of(
    yup.object().shape({
      ingredientId: yup.string().required(),
      unit: yup.string().required(),
      quantity: yup.number().required(),
    })
  ),
});

const RecipeAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  /*
  ingredientObj
  {
    selectId: "",
    ingredientId: "",
    unit: "",
    quantity: "",
  }
  */

  const { data: ingredients } = useQuery({
    queryKey: ['ingredients'],
    queryFn: () => listIngredients(),
  });

  const [ingredientIds, setIngredientIds] = useState([]);

  const updateIngredientIds = (index, data) => {
    const newArr = ingredientIds.filter((select) => select.selectId !== index);
    const oldObj = ingredientIds.filter(
      (select) => select.selectId === index
    )[0];

    setIngredientIds([
      ...newArr,
      {
        ...oldObj,
        ...(data.ingredientId && { ingredientId: data.ingredientId }),
        ...(data.unit && { unit: data.unit }),
        ...(data.quantity && { quantity: data.quantity }),
      },
    ]);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = ingredientIds.filter(
      (ingredient, i) => i !== index
    );
    setIngredientIds(updatedIngredients);
  };

  useEffect(() => {
    console.log(ingredientIds);
    console.log(errors.ingredients);
  }, [ingredientIds]);

  const handleOnChangeIngredients = (index, event) => {
    const ingredientId = event.target.value;
    updateIngredientIds(index, {
      ingredientId,
    });
    setValue(`ingredients[${index}].ingredientId`, ingredientId);
  };
  const handleOnChangeQuantity = (index, event) => {
    const quantity = event.target.value;
    setValue(`ingredients[${index}].quantity`, quantity);
    updateIngredientIds(index, {
      quantity: parseInt(quantity),
    });
  };
  const handleOnChangeUnit = (index, event) => {
    const unit = event.target.value;
    setValue(`ingredients[${index}].unit`, unit);
    updateIngredientIds(index, {
      unit,
    });
  };

  const hadnleAddIngredient = () => {
    setIngredientIds([
      ...ingredientIds,
      {
        selectId: ingredientIds.length,
        ingredientId: ingredients[0].ingredientID,
        unit: '',
        quantity: 0,
      },
    ]);
  };

  const [description, setDescription] = useState('');
  const handleOnChangeDescription = (value) => {
    setDescription(value);
    setValue('description', value);
  };

  const { mutate } = useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      toast.success('Recipe created successfully');
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmitHandler = (data) => {
    console.log(data);
    mutate({
      ...data,
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
        spacing={2}
        sx={{ width: '50%' }}
      >
        <h2>Create a new recipe</h2>

        <TextField
          {...register('recipeName')}
          label="Recipe name"
          variant="outlined"
          error={!!errors.recipeName}
          helperText={errors.recipeName?.message}
          fullWidth
        />

        <TextField
          {...register('recipeImage')}
          label="Image URL"
          variant="outlined"
          error={!!errors.recipeImage}
          helperText={errors.recipeImage?.message}
          fullWidth
        />

        <Stack spacing={2}>
          <ReactQuill
            value={description}
            onChange={handleOnChangeDescription}
            modules={{ toolbar: true }}
            placeholder="Recipe description"
            style={{
              height: '150px',
              marginTop: '20px',
              marginBotton: '100px',
            }}
          />
          <Box style={{ marginTop: '50px' }}>
            {errors.description && (
              <Typography style={{ color: 'red' }}>
                {errors.description.message}
              </Typography>
            )}
          </Box>
        </Stack>
        <Typography>{errors.ingredients?.message}</Typography>
        {ingredientIds &&
          ingredientIds.map((ingredientObj, index) => {
            setValue(
              `ingredients[${index}].ingredientId`,
              ingredientObj.ingredientId
            );
            return (
              <Grid key={index} container spacing={3}>
                <Grid item xs={12}>
                  <InputLabel id={`select-${index}-label`}>
                    Ingredient {index + 1}
                  </InputLabel>
                </Grid>

                <Grid item xs={5}>
                  <Select
                    labelId={`select-${index}-label`}
                    id={`select-${index}`}
                    onChange={(event) =>
                      handleOnChangeIngredients(index, event)
                    }
                    value={ingredientObj.ingredientId}
                    fullWidth
                  >
                    {ingredients &&
                      ingredients.map((ingredient, index) => (
                        <MenuItem key={index} value={ingredient.ingredientID}>
                          {ingredient.ingredientName}
                        </MenuItem>
                      ))}
                  </Select>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    // error={!!errors.ingredients[index]?.quantity}
                    // helperText={!!errors.ingredients[index]?.quantity}
                    id={`quantity-${index}`}
                    label="Quantity"
                    variant="outlined"
                    fullWidth
                    onChange={(event) => handleOnChangeQuantity(index, event)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id={`unit-${index}`}
                    label="Unit"
                    variant="outlined"
                    fullWidth
                    onChange={(event) => handleOnChangeUnit(index, event)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    onClick={() => handleRemoveIngredient(index)}
                    aria-label="delete"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            );
          })}

        <Button
          style={{ marginTop: '60px' }}
          onClick={hadnleAddIngredient}
          variant="contained"
          color="primary"
        >
          Add Ingredient
        </Button>

        <Button
          style={{ marginTop: '30px' }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Create
        </Button>
      </Stack>
    </div>
  );
};

export default RecipeAdd;

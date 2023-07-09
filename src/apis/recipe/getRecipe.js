import axiosInstance from '../../utils/axios';

export const getRecipe = async (id) => {
  return await axiosInstance.get(`/Recipe/${id}`);
};

export const getRecipeForEdit = async (id) => {
  const res = await getRecipe(id);
  if (res.recipeDetails) {
    res.ingredients = res.recipeDetails.map((recipeDetail, index) => {
      return {
        selectId: index,
        ingredientId: recipeDetail.ingredient.ingredientID,
        unit: recipeDetail.unit,
        quantity: recipeDetail.quantity,
      };
    });
  }
  return res;
};

import axiosInstance from '../../utils/axios';

export const editRecipe = async (id, recipe) => {
  console.log('call edit', {
    id,
    recipe,
  });
  return await axiosInstance.put(`/Recipe/${id}`, recipe);
};

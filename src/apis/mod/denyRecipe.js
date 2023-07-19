import axiosInstance from '../../utils/axios';

export const denyRecipe = async (id) => {
  return await axiosInstance.delete(`/Contributer/RecipeId?recId=${id}`);
};

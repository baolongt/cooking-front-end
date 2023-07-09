import axiosInstance from '../../utils/axios';

export const createRecipe = async (newRecipe) => {
  return await axiosInstance.post('/Recipe', newRecipe);
};

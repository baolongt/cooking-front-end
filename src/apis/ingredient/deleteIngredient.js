import axiosInstance from '../../utils/axios';

export const deleteIngredient = async (id) => {
  return await axiosInstance.delete(`/Ingredient${id}`);
};

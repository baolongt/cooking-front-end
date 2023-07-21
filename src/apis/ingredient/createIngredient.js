import axiosInstance from '../../utils/axios';

export const addIngredient = async (name) => {
  return await axiosInstance.post(`/Ingredient?ingName=${name}`);
};

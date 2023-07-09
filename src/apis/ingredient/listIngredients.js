import axiosInstance from '../../utils/axios';

export const listIngredients = async () => {
  return await axiosInstance.get('/Ingredient');
};

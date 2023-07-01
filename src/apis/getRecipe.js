import axiosInstance from '../utils/axios';

export const getRecipe = async (id) => {
  return await axiosInstance.get(`/Recipe/${id}`);
};

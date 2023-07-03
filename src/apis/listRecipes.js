import axiosInstance from '../utils/axios';

export const listRecipes = async () => {
  return await axiosInstance.get('/Recipe');
};

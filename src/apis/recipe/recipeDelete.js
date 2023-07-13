import axiosInstance from '../../utils/axios';

export const deleteRecipe = async (id) => {
  return await axiosInstance.delete(`/Recipe/${id}`);
};

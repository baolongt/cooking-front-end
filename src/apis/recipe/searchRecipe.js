import axiosInstance from '../../utils/axios';

export const searchRecipe = async (search) => {
  return await axiosInstance.get('/Recipe', {
    params: {
      recipeName: search,
    },
  });
};

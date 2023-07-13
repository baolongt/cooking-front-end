import axiosInstance from '../../utils/axios';

export const listMeals = async (search) => {
  return await axiosInstance.get('/Meal', {
    params: {
      mealName: search,
    },
  });
};

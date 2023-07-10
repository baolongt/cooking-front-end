import axiosInstance from '../../utils/axios';

export const listMeals = async () => {
  return await axiosInstance.get('/Meal');
};

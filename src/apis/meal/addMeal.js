import axiosInstance from '../../utils/axios';

export const addMeal = async (meal) => {
  return await axiosInstance.post('/Meal', {
    ...meal,
    accountID: localStorage.getItem('accountID'),
  });
};

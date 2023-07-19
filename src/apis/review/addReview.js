import axiosInstance from '../../utils/axios';

export const addReview = async (review) => {
  return await axiosInstance.post('/Review', {
    ...review,
    accountID: localStorage.getItem('accountID'),
  });
};

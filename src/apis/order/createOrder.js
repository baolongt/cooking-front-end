import axiosInstance from '../../utils/axios';

export const createOrder = async (order) => {
  return await axiosInstance.post('/Order', order);
};

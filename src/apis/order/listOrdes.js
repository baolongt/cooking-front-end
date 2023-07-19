import axiosInstance from '../../utils/axios';

export const listOrders = async () => {
  return await axiosInstance.get('/Order');
};

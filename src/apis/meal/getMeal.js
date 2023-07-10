import axiosInstance from '../../utils/axios';

export const getMeal = async (id) => {
  return await axiosInstance.get(`/Meal/${id}`);
};

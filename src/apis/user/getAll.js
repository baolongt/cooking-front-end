import axiosInstance from '../../utils/axios';

export const getUserById = async (id) => {
  return await axiosInstance.get(`/Account/${id}`);
};

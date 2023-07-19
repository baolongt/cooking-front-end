import axiosInstance from '../../utils/axios';

export const approveRecipe = async (id) => {
  return await axiosInstance.put(`/Contributer?recId=${id}`);
};

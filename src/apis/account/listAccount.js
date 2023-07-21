import axiosInstance from '../../utils/axios';

export const listAccounts = async () => {
  return await axiosInstance.get('/Admin');
};

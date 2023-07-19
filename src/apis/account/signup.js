import axiosInstance from '../../utils/axios';

export const signup = async (account) => {
  const result = await axiosInstance.post('/Account/SignUp', account);
  return result;
};

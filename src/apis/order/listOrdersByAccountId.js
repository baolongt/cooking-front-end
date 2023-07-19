import axiosInstance from '../../utils/axios';

export const listOrdersByAccountId = async () => {
  return await axiosInstance.get(
    `/Order/User/${localStorage.getItem('accountID')}`
  );
};

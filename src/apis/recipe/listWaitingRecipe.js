import axiosInstance from '../../utils/axios';

export const listWaitingRecipes = async () => {
  const result = await axiosInstance.get(
    '/Recipe/waiting/StatusOrder(watting,removed...)'
  );
  return result.result;
};

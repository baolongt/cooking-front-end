import axiosInstance from '../../utils/axios';

export const signin = async (account) => {
  const result = await axiosInstance.post('/Account/login', account);
  localStorage.setItem('token', result.token);
  localStorage.setItem(
    'accountID',
    JSON.stringify(result.accountID).replaceAll('"', '')
  );
  localStorage.setItem('role', result.role.roleName);
  return result;
};

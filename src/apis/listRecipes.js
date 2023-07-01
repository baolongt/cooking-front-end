import axiosInstance from '../utils/axios';

export const listRecipes = () => {
  axiosInstance
    .get('/Recipe')
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};

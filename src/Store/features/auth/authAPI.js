import publicAPI from '../../services/publicAPI';
import privateAPI from '../../services/privateAPI';

export const registerUserAPI = async (data) => {
  const response = await publicAPI.post('/auth/users/register', data);
  return response.data;
};

export const loginUserAPI = async (data) => {
  const response = await publicAPI.post('/auth/users/login', data);
  return response.data;
};

export const getProfileAPI = async () => {
  const response = await privateAPI.get('/auth/users/profile');
  return response.data;
};

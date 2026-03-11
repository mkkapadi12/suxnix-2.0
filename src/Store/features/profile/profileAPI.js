import privateAPI from '../../services/privateAPI';

export const updateProfileAPI = async (data) => {
  const response = await privateAPI.put('/auth/users/profile', data);
  return response.data;
};

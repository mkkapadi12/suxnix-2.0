import privateAPI from '../../services/privateAPI';

export const getAddressesAPI = async () => {
  const response = await privateAPI.get('/auth/users/addresses');
  return response.data;
};

export const createAddressAPI = async (data) => {
  const response = await privateAPI.post('/auth/users/addresses', data);
  return response.data;
};

export const updateAddressAPI = async (id, data) => {
  const response = await privateAPI.put(`/auth/users/addresses/${id}`, data);
  return response.data;
};

export const deleteAddressAPI = async (id) => {
  const response = await privateAPI.delete(`/auth/users/addresses/${id}`);
  return response.data;
};

export const setDefaultAddressAPI = async (id) => {
  const response = await privateAPI.patch(`/auth/users/addresses/${id}/set-default`);
  return response.data;
};

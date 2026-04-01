import privateAPI from '../../../services/privateAPI';

export const getProductStatsAPI = async () => {
  const response = await privateAPI.get('/products/admin/stats');
  return response.data;
};

export const getAllProductsAPI = async () => {
  const response = await privateAPI.get('/products/admin/all');
  return response.data;
};

export const createProductAPI = async (data) => {
  const response = await privateAPI.post('/products/admin/create', data);
  return response.data;
};

export const updateProductAPI = async (id, data) => {
  const response = await privateAPI.put(`/products/admin/${id}`, data);
  return response.data;
};

export const deleteProductAPI = async (id) => {
  const response = await privateAPI.delete(`/products/admin/${id}`);
  return response.data;
};

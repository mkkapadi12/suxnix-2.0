import privateAPI from '../../../services/privateAPI';

export const getProductStatsAPI = async () => {
  const response = await privateAPI.get('/products/admin/stats');
  return response.data;
};

export const getAllProductsAPI = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await privateAPI.get(`/products/admin/all${query ? '?' + query : ''}`);
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

export const updateProductStatusAPI = async (id, status) => {
  const response = await privateAPI.patch(`/products/admin/${id}/status`, { status });
  return response.data;
};

export const togglePublishAPI = async (id) => {
  const response = await privateAPI.patch(`/products/admin/${id}/publish`);
  return response.data;
};

export const toggleFeaturedAPI = async (id) => {
  const response = await privateAPI.patch(`/products/admin/${id}/featured`);
  return response.data;
};

export const toggleBestsellerAPI = async (id) => {
  const response = await privateAPI.patch(`/products/admin/${id}/bestseller`);
  return response.data;
};

export const updateStockAPI = async (id, stock) => {
  const response = await privateAPI.patch(`/products/admin/${id}/stock`, { stock });
  return response.data;
};

export const bulkUpdateStatusAPI = async (productIds, status) => {
  const response = await privateAPI.patch('/products/admin/bulk/status', { productIds, status });
  return response.data;
};

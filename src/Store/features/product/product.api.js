import publicAPI from '../../services/publicAPI';

export const getAllProductsAPI = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await publicAPI.get(`/products${query ? '?' + query : ''}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getFeaturedProductsAPI = async (limit = 8) => {
  try {
    const response = await publicAPI.get(`/products/featured?limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getBestsellerProductsAPI = async (limit = 8) => {
  try {
    const response = await publicAPI.get(`/products/bestsellers?limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProductsByCategoryAPI = async (category, params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await publicAPI.get(
      `/products/category/${category}${query ? '?' + query : ''}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProductBySlugAPI = async (slug) => {
  try {
    const response = await publicAPI.get(`/products/${slug}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProductByIdAPI = async (id) => {
  try {
    const response = await publicAPI.get(`/products/id/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getRelatedProductsAPI = async (productId) => {
  try {
    const response = await publicAPI.get(`/products/${productId}/related`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

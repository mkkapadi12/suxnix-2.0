import publicAPI from '../../services/publicAPI';

export const getAllProductsAPI = async (params = {}) => {
  try {
    const query = new URLSearchParams();

    // Map sortBy → sort (backend key)
    if (params.sortBy && params.sortBy !== 'newest') {
      query.set('sort', params.sortBy);
    }

    if (params.search) query.set('search', params.search);
    if (params.category) query.set('category', params.category);

    // Price range — only send if non-default
    if (params.minPrice && params.minPrice > 0) {
      query.set('minPrice', params.minPrice);
    }
    if (params.maxPrice && params.maxPrice < 5000) {
      query.set('maxPrice', params.maxPrice);
    }

    // Boolean feature flags
    if (params.isFeatured === true) query.set('isFeatured', 'true');
    if (params.isBestseller === true) query.set('isBestseller', 'true');

    // Brand array — append each as a separate param
    if (Array.isArray(params.brand) && params.brand.length > 0) {
      params.brand.forEach((b) => query.append('brand', b));
    }

    // Pagination
    if (params.page && params.page > 1) query.set('page', params.page);
    if (params.limit) query.set('limit', params.limit);

    const queryStr = query.toString();
    const response = await publicAPI.get(
      `/products${queryStr ? '?' + queryStr : ''}`,
    );
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
    const response = await publicAPI.get(
      `/products/bestsellers?limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProductsByCategoryAPI = async (category, params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await publicAPI.get(
      `/products/category/${category}${query ? '?' + query : ''}`,
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProductBySlugAPI = async (slug) => {
  const response = await publicAPI.get(`/products/${slug}`);
  return response.data;
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

import privateAPI from '../../services/privateAPI';

export const getWishlistAPI = async () => {
  const response = await privateAPI.get('/user/wishlist');
  return response.data;
};

export const addToWishlistAPI = async (productData) => {
  const response = await privateAPI.post('/user/wishlist', productData);
  return response.data;
};

export const removeFromWishlistAPI = async (productId) => {
  const response = await privateAPI.delete(`/user/wishlist/${productId}`);
  return response.data;
};

export const clearWishlistAPI = async () => {
  const response = await privateAPI.delete('/user/wishlist');
  return response.data;
};

export const checkInWishlistAPI = async (productId) => {
  const response = await privateAPI.get(`/user/wishlist/check/${productId}`);
  return response.data;
};

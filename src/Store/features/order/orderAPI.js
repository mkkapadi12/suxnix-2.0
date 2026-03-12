import privateAPI from '../../services/privateAPI';

export const getOrders = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await privateAPI.get(
    `/user/orders${queryString ? '?' + queryString : ''}`,
  );
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await privateAPI.get(`/user/orders/${orderId}`);
  return response.data;
};

export const createNewOrder = async (orderData) => {
  const response = await privateAPI.post('/user/orders', orderData);
  return response.data;
};

export const updateOrderStatusAPI = async (orderId, statusData) => {
  const response = await privateAPI.put(`/user/orders/${orderId}`, statusData);
  return response.data;
};

export const cancelOrderAPI = async (orderId, data) => {
  const response = await privateAPI.patch(
    `/user/orders/${orderId}/cancel`,
    data,
  );
  return response.data;
};

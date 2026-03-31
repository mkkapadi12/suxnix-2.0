import publicAPI from '../../services/publicAPI';
import privateAPI from '../../services/privateAPI';

export const registerAdminAPI = async (data) => {
  const response = await publicAPI.post('/admin/register', data);
  return response.data;
};

export const loginAdminAPI = async (data) => {
  const response = await publicAPI.post('/admin/login', data);
  return response.data;
};

export const getAdminProfileAPI = async () => {
  const response = await privateAPI.get('/admin/profile');
  return response.data;
};

export const updateAdminProfileAPI = async (data) => {
  const response = await privateAPI.put('/admin/profile', data);
  return response.data;
};

export const changeAdminPasswordAPI = async (data) => {
  const response = await privateAPI.post('/admin/change-password', data);
  return response.data;
};

export const logoutAdminAPI = async () => {
  // Backend doesn't require logout API call, just frontend cleanup
  return { success: true };
};

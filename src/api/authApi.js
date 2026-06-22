// src/api/authApi.js
import apiClient from './axiosConfig';

export const authApi = {
  login: async (username, password) => {
    const response = await apiClient.post('/auth/login', {
      username,
      password,
      expiresInMins: 30,
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  getUserProfile: async (userId) => {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  },

  getUserCarts: async (userId) => {
    const response = await apiClient.get(`/carts/user/${userId}`);
    return response.data;
  },

  getAllProducts: async () => {
    const response = await apiClient.get('/products');
    return response.data;
  },

  addToCart: async (cartData) => {
    const response = await apiClient.post('/carts/add', cartData);
    return response.data;
  },

  deleteCart: async (cartId) => {
    const response = await apiClient.delete(`/carts/${cartId}`);
    return response.data;
  },
};
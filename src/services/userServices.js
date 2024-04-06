// userService.js

import axios from 'axios';

const API_URL = 'http://localhost:3005/api/users';

const getAllUsers = (token) => {
  return axios.get(API_URL, {
    headers: {
      Authorization: token
    }
  });
};

const getUserById = (userId, token) => {
  return axios.get(`${API_URL}/${userId}`, {
    headers: {
      Authorization: token
    }
  });
};

const updateUserById = (userId, userData, token) => {
  return axios.put(`${API_URL}/${userId}`, userData, {
    headers: {
      Authorization: token
    }
  });
};

const deleteUserById = (userId, token) => {
  return axios.delete(`${API_URL}/${userId}`, {
    headers: {
      Authorization: token
    }
  });
};

export { getAllUsers, getUserById, updateUserById, deleteUserById };

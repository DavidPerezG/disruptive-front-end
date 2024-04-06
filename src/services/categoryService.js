// categoryService.js

import axios from 'axios';

const API_URL = 'http://localhost:3005/api/categories';

const createCategory = (categoryData, token) => {
  return axios.post(API_URL, categoryData, {
    headers: {
      Authorization: token
    }
  });
};

const getAllCategories = (token) => {
  return axios.get(API_URL, {
    headers: {
      Authorization: token
    }
  });
};

const getCategoryById = (categoryId, token) => {
  return axios.get(`${API_URL}/${categoryId}`, {
    headers: {
      Authorization: token
    }
  });
};

const updateCategoryById = (categoryId, categoryData, token) => {
  return axios.put(`${API_URL}/${categoryId}`, categoryData, {
    headers: {
      Authorization: token
    }
  });
};

const deleteCategoryById = (categoryId, token) => {
  return axios.delete(`${API_URL}/${categoryId}`, {
    headers: {
      Authorization: token
    }
  });
};

export { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById };

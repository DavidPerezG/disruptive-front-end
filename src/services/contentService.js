// contentService.js

import axios from 'axios';

const API_URL = 'http://localhost:3005/api/contents';

const createContent = (contentData, token) => {
  return axios.post(API_URL, contentData, {
    headers: {
      Authorization: token
    }
  });
};

const getAllContent = (token) => {
  return axios.get(API_URL, {
    headers: {
      Authorization: token
    }
  });
};

const getContentById = (contentId, token) => {
  return axios.get(`${API_URL}/${contentId}`, {
    headers: {
      Authorization: token
    }
  });
};

const getContentCounts = (categoryId, token) => {
  return axios.get(`${API_URL}/${categoryId}/counts`, {
    headers: {
      Authorization: token
    }
  });
};

export { createContent, getAllContent, getContentById, getContentCounts };

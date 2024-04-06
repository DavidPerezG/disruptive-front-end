import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3005/api/auth';

const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const setIdHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['UserId'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['UserId'];
  }
};

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Return data if registration is successful
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message); // Throw error with message if available
    } else {
      throw new Error('An error occurred while registering.'); // Throw generic error message
    }
  }
};



const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    const { token, user } = response.data;
    Cookies.set('authToken', token, { expires: 1 / 24 });
    setAuthHeader(token);

    Cookies.set('userId', user._id, { expires: 1 / 24 });
    setIdHeader(user._id);
    // Save user info in global variable

    return token;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An error occurred while logging in.');
    }
  }
};


const removeAuthHeader = () => {
  delete axios.defaults.headers.common['Authorization'];
};

const logoutUser = () => {
  // Remove authToken from cookie
  Cookies.remove('authToken');
  // Remove authToken from authorization header
  removeAuthHeader();
};

export { registerUser, loginUser, logoutUser };

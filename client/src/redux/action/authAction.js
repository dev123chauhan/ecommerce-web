import axios from 'axios';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  checkAuthState,
} from '../slice/authSlice';
const API_URL = import.meta.env.VITE_API_URL
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    const { token, user } = response.data;
    
    if (!token || !user) {
      throw new Error('Invalid response from server');
    }
    
    dispatch(loginSuccess({ token, user }));
    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed';
    dispatch(loginFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerStart());
    const response = await axios.post(`${API_URL}/users/register`, userData);
    console.log(response)
    dispatch(registerSuccess());
    dispatch(loginUser({ email: userData.email, password: userData.password }));
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.message || 'Registration failed'));
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};

export const checkAuthentication = () => (dispatch) => {
  dispatch(checkAuthState());
};
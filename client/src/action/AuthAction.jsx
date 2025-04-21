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
  profileUpdateStart,
  profileUpdateSuccess,
  profileUpdateFailure,
} from '../slice/AuthSlice';

const API_URL = 'http://localhost:3000/api';

// Add axios interceptor to handle token
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
    // Automatically login after successful registration
    dispatch(loginUser({ email: userData.email, password: userData.password }));
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.message || 'Registration failed'));
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(profileUpdateStart());
    const response = await axios.put(
      `${API_URL}/users/update-profile`, 
      userData
    );
    
    dispatch(profileUpdateSuccess(response.data.user));
    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Update failed';
    dispatch(profileUpdateFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};


export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};

// Add function to check auth state
export const checkAuthentication = () => (dispatch) => {
  dispatch(checkAuthState());
};
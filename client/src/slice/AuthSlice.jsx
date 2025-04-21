import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('userData')) || null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
  // passwordChangeLoading: false,
  // passwordChangeError: null,
  // passwordChangeSuccess: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      // Store user data in localStorage
      localStorage.setItem('userData', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      // Clear localStorage on login failure
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      // Clear localStorage on logout
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
    },
    // Add a new reducer to check auth state
    checkAuthState: (state) => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');
      if (token && userData) {
        state.isAuthenticated = true;
        state.token = token;
        state.user = JSON.parse(userData);
      } else {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
      }
    },
    profileUpdateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    profileUpdateSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem('userData', JSON.stringify(action.payload));
    },
    profileUpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // passwordChangeStart: (state) => {
    //   state.passwordChangeLoading = true;
    //   state.passwordChangeError = null;
    //   state.passwordChangeSuccess = null;
    // },
    // passwordChangeSuccess: (state, action) => {
    //   state.passwordChangeLoading = false;
    //   state.passwordChangeSuccess = action.payload;
    //   state.passwordChangeError = null;
    // },
    // passwordChangeFailure: (state, action) => {
    //   state.passwordChangeLoading = false;
    //   state.passwordChangeError = action.payload;
    //   state.passwordChangeSuccess = null;
    // },
    // clearPasswordChangeStatus: (state) => {
    //   state.passwordChangeLoading = false;
    //   state.passwordChangeError = null;
    //   state.passwordChangeSuccess = null;
    // }
  }
});

export const {
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
  // passwordChangeStart,
  // passwordChangeSuccess,
  // passwordChangeFailure,
  // clearPasswordChangeStatus
} = authSlice.actions;

export default authSlice.reducer;
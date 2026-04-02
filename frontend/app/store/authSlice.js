import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // { user_id, username, email, role, token }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login: Save to Redux and localStorage
    setUser: (state, action) => {
      state.user = action.payload;
      
      // Persist to localStorage
      if (action.payload?.token) {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user_id', action.payload.user_id || '');
        localStorage.setItem('username', action.payload.username || '');
        localStorage.setItem('email', action.payload.email || '');
        localStorage.setItem('role', action.payload.role || 'user');
      }
    },
    
    // Logout: Clear Redux and localStorage
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
    },

    // Load user from localStorage on app startup
    loadFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const user_id = localStorage.getItem('user_id');
        
        if (token && user_id) {
          state.user = {
            user_id,
            username: localStorage.getItem('username') || '',
            email: localStorage.getItem('email') || '',
            role: localStorage.getItem('role') || 'user',
            token,
          };
        }
      }
    },
  },
});

export const { setUser, clearUser, loadFromStorage } = authSlice.actions;

// Single simple selector - get entire auth state
export const selectAuth = (state) => state.auth.user;

// Convenience selectors (optional, for easier access)
export const selectUserId = (state) => state.auth.user?.user_id;
export const selectRole = (state) => state.auth.user?.role || 'user';
export const selectIsAuthenticated = (state) => !!state.auth.user?.token;

export default authSlice.reducer;

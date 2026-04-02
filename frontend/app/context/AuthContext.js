'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user and token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const userRole = localStorage.getItem('role');

    if (storedToken && userId) {
      setToken(storedToken);
      setUser({ 
        user_id: userId,
        username, 
        email 
      });
      setRole(userRole || 'user');
    }
    setLoading(false);
  }, []);

  const login = (userData, authToken, userRole = 'user') => {
    setUser(userData);
    setToken(authToken);
    setRole(userRole);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user_id', userData.user_id);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('role', userRole);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    setError(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    // Force page reload to clear all cached state
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, token, role, loading, error, setError, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

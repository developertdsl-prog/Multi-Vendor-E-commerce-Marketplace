import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, register, getProfile } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfile()
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (credentials) => {
    const res = await login(credentials);
    localStorage.setItem('token', res.data.token);
    setUser(res.data);
    return res.data;
  };

  const handleRegister = async (userData) => {
    const res = await register(userData);
    localStorage.setItem('token', res.data.token);
    setUser(res.data);
    return res.data;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

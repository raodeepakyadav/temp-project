import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { STORAGE_KEYS, USER_ROLES, DEMO_USERS } from '../utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth from localStorage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const storedUser = localStorage.getItem(STORAGE_KEYS.AUTH_USER);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } else {
        // Default to demo student for an instant smooth first impression
        const defaultStudent = DEMO_USERS.STUDENT;
        const defaultToken = 'jwt_demo_student_token';
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, defaultToken);
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(defaultStudent));
        setToken(defaultToken);
        setUser(defaultStudent);
      }
    } catch (e) {
      console.error('Error restoring auth state', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await authService.login(credentials);
      setUser(res.user);
      setToken(res.token);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await authService.register(userData);
      setUser(res.user);
      setToken(res.token);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const switchDemoRole = (role) => {
    if (role === USER_ROLES.ADMIN) {
      const admin = DEMO_USERS.ADMIN;
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'jwt_demo_admin_token');
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(admin));
      setUser(admin);
      setToken('jwt_demo_admin_token');
    } else {
      const student = DEMO_USERS.STUDENT;
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'jwt_demo_student_token');
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(student));
      setUser(student);
      setToken('jwt_demo_student_token');
    }
  };

  const updateUserProfile = (updatedData) => {
    const updated = authService.updateCurrentUser(updatedData);
    setUser(updated);
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === USER_ROLES.ADMIN;
  const isStudent = user?.role === USER_ROLES.STUDENT;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        isAdmin,
        isStudent,
        login,
        register,
        logout,
        switchDemoRole,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

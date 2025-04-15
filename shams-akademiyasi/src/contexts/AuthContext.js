import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const userData = await apiService.getUserProfile();
            setUser(userData);
            setError(null);
        } catch (err) {
            setError('Failed to fetch user profile');
            console.error('Auth error:', err);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            setLoading(true);
            const data = await apiService.login(credentials);
            await fetchUserProfile();
            return data;
        } catch (err) {
            setError('Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        apiService.logout();
        setUser(null);
    };

    const isAuthenticated = () => {
        return !!localStorage.getItem('access_token');
    };

    const hasRole = (role) => {
        return user?.roles?.includes(role);
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated,
        hasRole,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}; 
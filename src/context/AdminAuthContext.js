import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [isAdminAuth, setIsAdminAuth] = useState(false);

    useEffect(() => {
        const checkAdminAuth = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/validateToken`, {
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY,
                    },
                    withCredentials: true,
                });
                if (response.data) {
                    setAdmin(response.data.admin);
                    setIsAdminAuth(true);
                }
            } catch (error) {
                setIsAdminAuth(false);
                setAdmin(null);
            }
        };
        checkAdminAuth();
    }, []);

    const login = (adminData) => {
        setAdmin(adminData);
        setIsAdminAuth(true);
    };

    const logout = async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/logout`, {}, {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
            },
            withCredentials: true,
        });
        setAdmin(null);
        setIsAdminAuth(false);
    };

    return (
        <AdminAuthContext.Provider value={{ admin, isAdminAuth, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validateToken = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/validateToken`, {
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY,
                    },
                    withCredentials: true,
                });

                setUser({
                    id: data.user.id,
                    username: data.user.username,
                    email: data.user.email,
                });
                setIsAuth(true);
            } catch (error) {
                setUser(null);
                setIsAuth(false);
            } finally {
                setLoading(false);
            }
        };

        validateToken();
    }, []);

    const login = (data) => {
        setUser(data);
        setIsAuth(true);
    };

    const logout = async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/users/logout`, {}, {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
            },
            withCredentials: true,
        });
        setUser(null);
        setIsAuth(false);
    };

    return (
        <UserAuthContext.Provider value={{ user, isAuth, login, logout, loading }}>
            {!loading && children}
        </UserAuthContext.Provider>
    );
};

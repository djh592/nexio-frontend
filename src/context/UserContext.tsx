'use client';
import React, { createContext, useState, useEffect } from 'react';
import { User, INITIAL_USER } from '@/lib/definitions';

export const UserContext = createContext<{
    currentUser: User;
    setCurrentUser: (user: User) => void;
} | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>(INITIAL_USER);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, []);

    const updateUser = (newUser: User) => {
        setUser(newUser);
        if (typeof window !== 'undefined') {
            localStorage.setItem("user", JSON.stringify(newUser));
        }
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const storedUser = localStorage.getItem("user");
            setUser(storedUser ? JSON.parse(storedUser) : INITIAL_USER);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener("storage", handleStorageChange);
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener("storage", handleStorageChange);
            }
        };
    }, []);

    return (
        <UserContext.Provider value={{ currentUser: user, setCurrentUser: updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
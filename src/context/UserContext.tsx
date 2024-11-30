'use client';
import React, { createContext, useState, useEffect } from 'react';
import { User, INITIAL_USER } from '@/lib/definitions';


export const UserContext = createContext<{
    currentUser: User;
    setCurrentUser: (user: User) => void;
} | null>(null);


export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : INITIAL_USER;
    });

    const updateUser = (newUser: User) => {
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const storedUser = localStorage.getItem("user");
            setUser(storedUser ? JSON.parse(storedUser) : INITIAL_USER);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <UserContext.Provider value={{ currentUser: user, setCurrentUser: updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
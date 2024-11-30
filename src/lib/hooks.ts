import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, AppStore, RootState } from './store'
import { useState, useEffect } from 'react';
import { User, INITIAL_USER } from '@/lib/definitions';

// Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()


export function useCurrentUser() {
    const [user, setUser] = useState<User>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : INITIAL_USER;
    });

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'user') {
                setUser(event.newValue ? JSON.parse(event.newValue) : INITIAL_USER);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return user;
}
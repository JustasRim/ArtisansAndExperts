import { useEffect, useState } from 'react';

import { useLocalStorage } from './useLocalStorage';

export interface User {
  name: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    const userFromStorage = getItem('user');
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);

  const login = (user: User | null) => {
    setUser(user);
    setItem('user', JSON.stringify(user));
  };

  return { user, login };
};

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
    const user = getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const login = (user: User | null) => {
    setUser(user);
    setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setItem('user', JSON.stringify(null));
  };

  const setTokens = (accessToken: string, refreshToken: string) => {
    if (!user) {
      throw 'setting tokens when user is not defined';
    }

    setUser({
      ...user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  };

  return { user, login, logout, setTokens };
};

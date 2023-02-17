import axios from 'axios';
import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

export const useAxios = () => {
  const { user, setUser } = useContext(AuthContext);

  const ax = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'x-api-key': import.meta.env.VITE_API_KEY,
    },
  });

  ax.interceptors.request.use((config) => {
    if (!config?.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }

    if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
    }

    return config;
  });

  ax.interceptors.response.use(
    (response) => response,
    async (err) => {
      const { config } = err;

      if (!config || config.isRetryRequest) {
        return err;
      }

      if (err.response.status !== 401) {
        return err;
      }

      config.isRetryRequest = true;
      if (!user) {
        return err;
      }

      const refreshResponse = await ax.post('/token/refresh', {
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      });

      if (refreshResponse.status !== 200) {
        return err;
      }

      const { accessToken, refreshToken } = refreshResponse.data;
      setUser({ ...user, accessToken, refreshToken });

      err.config.headers.Authorization = `Bearer ${accessToken}`;
      return axios(err.config);
    }
  );

  return { ax };
};

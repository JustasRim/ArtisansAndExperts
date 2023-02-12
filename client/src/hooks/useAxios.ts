import axios from 'axios';

import { useAuth } from './useAuth';

export const useAxios = () => {
  const { user, setTokens } = useAuth();

  const ax = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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
      const { config, message } = err;

      if (!config || config.isRetryRequest) {
        return err;
      }

      if (!(message.includes('timeout') || message.includes('Network Error'))) {
        return err;
      }

      // if (err.status !== 401) {
      //   return;
      // }

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
      setTokens(accessToken, refreshToken);

      err.config.headers.Authorization = `Bearer ${accessToken}`;
      return axios(err.config);
    }
  );

  return { ax };
};

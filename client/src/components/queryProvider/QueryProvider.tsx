import { ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

export const QueryProvider = ({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    queryClient
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .prefetchQuery('key', async () => {}, {
        staleTime: 0,
      })
      .then(() => {
        setIsReady(true);
      });
  }, []);

  return isReady ? <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> : <></>;
};

import { useQuery } from 'react-query';

import { AdminUser } from '../utils/Interfaces';
import { useAxios } from './useAxios';

export function useAdminClients(search: string | undefined, banned: boolean | undefined) {
  const { ax } = useAxios();

  let url = `admin/clients?banned=${!!banned}`;
  if (search) {
    url += `&search=${search}`;
  }

  return useQuery<AdminUser[], Error>(['adminClients', { search, banned }], async () => {
    const clietns = await ax.get(url);
    if (clietns.request?.status === 204) {
      throw new Error('Nėra klientų');
    }

    return clietns.data;
  });
}

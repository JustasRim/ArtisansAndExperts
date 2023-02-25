import { useQuery } from 'react-query';

import { AdminUser } from '../utils/Interfaces';
import { useAxios } from './useAxios';

export function useAdminExperts(
  search: string | undefined,
  approved: boolean | undefined,
  banned: boolean | undefined
) {
  const { ax } = useAxios();

  let url = `admin/experts?approved=${!!approved}&banned=${!!banned}`;
  if (search) {
    url += `&search=${search}`;
  }

  return useQuery<AdminUser[], Error>(['adminExperts', { search, approved, banned }], async () => {
    const experts = await ax.get(url);
    if (experts.request?.status === 204) {
      throw new Error('Nėra ekspertų');
    }

    return experts.data;
  });
}

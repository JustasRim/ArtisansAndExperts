import { useQuery } from 'react-query';

import { useAxios } from '../../hooks/useAxios';
import { UserProfile } from '../../utils/Interfaces';

export function Profile() {
  const { ax } = useAxios();
  const { isLoading, error, data } = useQuery<UserProfile, Error>('profile', async () => {
    const profile = await ax.get('user');
    return profile.data;
  });

  return <div>{data?.radius}</div>;
}

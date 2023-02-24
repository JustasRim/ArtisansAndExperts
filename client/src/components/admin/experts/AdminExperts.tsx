import { useQuery } from 'react-query';

import { useAxios } from '../../../hooks/useAxios';
import { AdminUser } from '../../../utils/Interfaces';
import { Card } from '../../card/Card';
import styles from '../admin.module.scss';
import { ExpertItem } from '../expertItem/ExpertItem';

export function AdminExperts() {
  const { ax } = useAxios();
  const { isLoading, error, data } = useQuery<AdminUser[], Error>('adminExperts', async () => {
    const experts = await ax.get('admin/experts');
    if (experts.request?.status === 204) {
      throw new Error('Nėra ekspertų');
    }
    return experts.data;
  });

  if (isLoading) {
    return <Card>Kraunasi...</Card>;
  }

  if (error) {
    return <Card>{error.message}</Card>;
  }

  return (
    <Card>
      <h2>Meistrai:</h2>
      <div className={styles.list}>
        {data?.map((adminUser) => (
          <ExpertItem key={adminUser.email} {...adminUser} />
        ))}
      </div>
    </Card>
  );
}

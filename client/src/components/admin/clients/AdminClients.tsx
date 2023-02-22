import { useQuery } from 'react-query';

import { useAxios } from '../../../hooks/useAxios';
import { AdminUser } from '../../../utils/Interfaces';
import { Card } from '../../card/Card';
import styles from '../admin.module.scss';
import { ClientListItem } from '../lientListItem/ClientListItem';

export function AdminClients() {
  const { ax } = useAxios();
  const { isLoading, error, data } = useQuery<AdminUser[], Error>('adminClients', async () => {
    const experts = await ax.get('admin/clients');
    if (experts.request?.status === 204) {
      throw new Error('Nėra klientų');
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
      <h2>Klientai:</h2>
      <div className={styles.list}>
        {data?.map((adminUser) => (
          <ClientListItem key={adminUser.email} {...adminUser} />
        ))}
      </div>
    </Card>
  );
}

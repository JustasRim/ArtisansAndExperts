import { useQuery } from 'react-query';

import { useAxios } from '../../../hooks/useAxios';
import { AdminUser } from '../../../utils/Interfaces';
import { Card } from '../../card/Card';
import styles from '../admin.module.scss';
import { ClientListItem } from '../lientListItem/ClientListItem';

export function Clients() {
  const { ax } = useAxios();
  const { isLoading, error, data } = useQuery<AdminUser[], Error>('adminClients', async () => {
    const experts = await ax.get('client');
    return experts.data;
  });

  if (isLoading) {
    return <div>Kraunasi...</div>;
  }

  if (error) {
    return <div>Klaida...</div>;
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

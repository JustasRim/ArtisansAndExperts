import { useQuery } from 'react-query';

import { useAxios } from '../../../hooks/useAxios';
import { AdminUser } from '../../../utils/Interfaces';
import { Card } from '../../card/Card';
import styles from '../admin.module.scss';
import { ExpertListItem } from '../expertListItem/ExpertListItem';

export function Experts() {
  const { ax } = useAxios();
  const { isLoading, error, data } = useQuery<AdminUser[], Error>('adminExperts', async () => {
    const experts = await ax.get('expert');
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
      <h2>Meistrai:</h2>
      <div className={styles.list}>
        {data?.map((adminUser) => (
          <ExpertListItem key={adminUser.email} {...adminUser} />
        ))}
      </div>
    </Card>
  );
}

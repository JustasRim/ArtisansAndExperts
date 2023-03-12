import { useState } from 'react';

import { useAdminClients } from '../../../hooks/useAdminClients';
import { useDebaunce } from '../../../hooks/useDebaunce';
import { Card } from '../../card/Card';
import { SearchBar } from '../../searchBar/SearchBar';
import styles from '../admin.module.scss';
import { ClientItem } from '../clientItem/ClientItem';

export function AdminClients() {
  const [search, setSearch] = useState<string>();
  const [banned, setBanned] = useState<boolean>(false);
  const searchDeb = useDebaunce(search, 500);

  const { data } = useAdminClients(searchDeb, banned);

  return (
    <>
      <SearchBar setSearch={setSearch} setActions={[{ name: 'Blokuotas', action: setBanned }]} />

      <Card>
        <h2>Klientai:</h2>
        <div className={styles.list}>
          {data?.map((adminUser) => (
            <ClientItem key={adminUser.email} {...adminUser} />
          ))}
        </div>
      </Card>
    </>
  );
}

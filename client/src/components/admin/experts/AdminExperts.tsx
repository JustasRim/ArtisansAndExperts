import { useState } from 'react';

import { useAdminExperts } from '../../../hooks/useAdminExperts';
import { useDebaunce } from '../../../hooks/useDebaunce';
import { Card } from '../../card/Card';
import { SearchBar } from '../../searchBar/SearchBar';
import styles from '../admin.module.scss';
import { ExpertItem } from '../expertItem/ExpertItem';

export function AdminExperts() {
  const [search, setSearch] = useState<string>();
  const [approved, setApproved] = useState<boolean>(false);
  const [banned, setBanned] = useState<boolean>(false);

  const searchDeb = useDebaunce(search, 500);

  const { data } = useAdminExperts(searchDeb, approved, banned);

  return (
    <>
      <SearchBar
        setSearch={setSearch}
        setActions={[
          { name: 'Patvirtintas', action: setApproved },
          { name: 'Blokuotas', action: setBanned },
        ]}
      />
      <Card>
        <h2>Meistrai:</h2>
        <div className={styles.list}>
          {data?.map((adminUser) => (
            <ExpertItem key={adminUser.email} {...adminUser} />
          ))}
        </div>
      </Card>
    </>
  );
}

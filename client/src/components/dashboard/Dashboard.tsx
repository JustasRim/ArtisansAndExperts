import moment from 'moment';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { useAxios } from '../../hooks/useAxios';
import { useDebaunce } from '../../hooks/useDebaunce';
import { ProjectBriefing } from '../../utils/Interfaces';
import { Card } from '../card/Card';
import { SearchBar } from '../searchBar/SearchBar';
import { Table } from '../table/Table';
import styles from './dashboard.module.scss';

export function Dashboard() {
  const { user } = useContext(AuthContext);
  const { ax } = useAxios();
  const [search, setSearch] = useState<string>();
  const searchDeb = useDebaunce(search, 500);

  const { data } = useQuery<ProjectBriefing[], Error>(['projectBriefings', { searchDeb }], async () => {
    const projects = await ax.get(`project/briefing${searchDeb ? '?search=' + searchDeb : ''}`);
    if (projects.request?.status === 204) {
      throw new Error('Nėra projektu');
    }

    return projects.data;
  });

  return (
    <div>
      <h1>
        {user?.name} {user?.lastName}, sveikas sugrįžęs!
      </h1>
      <div className={styles.actions}>
        <Link to="/offer" className={styles.actions__link} tabIndex={0}>
          <Card className={styles.actions__card}>Kurti užklausą </Card>
        </Link>
        <Link to="/comments" className={styles.actions__link} tabIndex={0}>
          <Card className={styles.actions__card}>Atsiliepimai</Card>
        </Link>
      </div>
      <h2>Pasiūlymai</h2>
      <p>To be table...</p>
      <h2>Projektai</h2>
      <SearchBar setSearch={setSearch} />
      <Table
        header={['Pavadinimas', 'Kategorija', 'Užsakymo laikas']}
        rows={data?.map((briefing) => ({
          id: briefing.id,
          row: [briefing.name, briefing.activity, moment(briefing.createdAt).format('yyyy/mm/d hh:mm')],
        }))}
      />
    </div>
  );
}

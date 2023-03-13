import moment from 'moment';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { useAxios } from '../../hooks/useAxios';
import { ProjectBriefing } from '../../utils/Interfaces';
import { TranslateStatus, TranslateTimeLine } from '../../utils/UtilityFunctions';
import { Card } from '../card/Card';
import { SearchBar } from '../searchBar/SearchBar';
import { Table } from '../table/Table';
import styles from './work.module.scss';

export function Work() {
  const [search, setSearch] = useState<string>();
  const { ax } = useAxios();
  const { data: todoProjects } = useQuery<ProjectBriefing[], Error>(['todoProjects'], async () => {
    const projects = await ax.get('project/active');
    if (projects.request?.status === 204) {
      throw new Error('Nėra projektu');
    }

    return projects.data;
  });

  return (
    <div>
      <h1>Čia gali rasti darbus</h1>
      <div className={styles.actions}>
        <Link to="/comments" className={styles.actions__link} tabIndex={0}>
          <Card className={styles.actions__card}>Atsiliepimai</Card>
        </Link>
      </div>
      <h2>Priimti pasiūlymai</h2>
      <p>To be table...</p>
      <h2>Projektai</h2>
      <SearchBar setSearch={setSearch} />
      <Table
        header={['Pavadinimas', 'Kategorija', 'Sukurtas', 'Atlikti']}
        rows={todoProjects?.map((briefing) => ({
          id: briefing.id,
          row: [
            briefing.name,
            briefing.activity,
            moment(briefing.createdAt).format('yyyy/MM/DD HH:mm'),
            TranslateTimeLine(briefing.timeLine),
          ],
        }))}
      />
    </div>
  );
}

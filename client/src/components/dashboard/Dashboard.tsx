import moment from 'moment';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { useAxios } from '../../hooks/useAxios';
import { useDebaunce } from '../../hooks/useDebaunce';
import { Status } from '../../utils/Enums';
import { Project, ProjectBriefing } from '../../utils/Interfaces';
import { Card } from '../card/Card';
import { Modal } from '../modal/Modal';
import { SearchBar } from '../searchBar/SearchBar';
import { Table } from '../table/Table';
import styles from './dashboard.module.scss';

export function Dashboard() {
  const { user } = useContext(AuthContext);
  const { ax } = useAxios();
  const [search, setSearch] = useState<string>();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string>();
  const searchDeb = useDebaunce(search, 500);

  const { data } = useQuery<ProjectBriefing[], Error>(['projectBriefings', { searchDeb }], async () => {
    const projects = await ax.get(`project/briefing${searchDeb ? '?search=' + searchDeb : ''}`);
    if (projects.request?.status === 204) {
      throw new Error('Nėra projektu');
    }

    return projects.data;
  });

  const { data: selectedProject } = useQuery<Project, Error>(['selectedProject', { selectedRow }], async () => {
    if (!selectedRow) return;

    const projects = await ax.get(`project/${selectedRow}`);
    if (projects.request?.status === 204) {
      throw new Error('Nėra projektu');
    }

    return projects.data;
  });

  const translateStatus = (status: Status | undefined) => {
    switch (status) {
      case Status.Active:
        return 'Aktyvus';

      case Status.Complete:
        return 'Įvykdytas';

      case Status.Deleted:
        return 'Ištrintas';

      default:
        return '';
    }
  };

  const onRowClick = (id: string) => {
    setSelectedRow(id);
    setModalOpen(true);
  };

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
        header={['Pavadinimas', 'Kategorija', 'Sukurtas', 'Statusas']}
        rows={data?.map((briefing) => ({
          id: briefing.id,
          row: [
            briefing.name,
            briefing.activity,
            moment(briefing.createdAt).format('yyyy/MM/DD HH:mm'),
            translateStatus(briefing.status),
          ],
        }))}
        onRowClick={onRowClick}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>Darbo Nr: {selectedProject?.id}</h2>
        <div className={styles.modal__details}>
          <div className={styles.modal__pair}>
            <p>
              Miestas: <strong>{selectedProject?.city}</strong>
            </p>
            <p>
              Atlikti: <strong>{selectedProject?.timeLine}</strong>
            </p>
          </div>
          <div className={styles.modal__pair}>
            <p>
              Pavadinimas: <strong>{selectedProject?.name}</strong>
            </p>
            <p>
              Statusas: <strong>{translateStatus(selectedProject?.status)}</strong>
            </p>
          </div>
          <div className={styles.modal__description}>
            <p>{selectedProject?.description}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { Card } from '../card/Card';
import styles from './dashboard.module.scss';

export function Dashboard() {
  const { user } = useContext(AuthContext);

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
    </div>
  );
}

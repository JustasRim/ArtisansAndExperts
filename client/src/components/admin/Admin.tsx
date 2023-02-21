import { Link, Outlet } from 'react-router-dom';

import styles from './admin.module.scss';

export function Admin() {
  return (
    <>
      <h1>Administravimas</h1>
      <div className={styles.navigation}>
        <Link to="experts" className={styles.navigation__link}>
          Ekspertai
        </Link>
        <Link to="clients" className={styles.navigation__link}>
          Klientai
        </Link>
      </div>
      <Outlet />
    </>
  );
}

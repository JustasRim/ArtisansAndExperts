import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import useWindowWidth from '../../hooks/useWindowWidth';
import { BREAKPOINT_TABELT } from '../../utils/Constants';
import Button from '../button/Button';
import styles from './sidebar.module.scss';

type Props = {
  className?: string;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ className, hidden, setHidden }: Props) => {
  useWindowWidth(BREAKPOINT_TABELT, () => setHidden(true));
  const { user, setUser } = useContext(AuthContext);

  return (
    <div className={hidden ? styles.hidden : ''}>
      <div className={`${styles.sidebar} ${className ?? ''}`}>
        <button className={styles.sidebar__close} onClick={() => setHidden(true)}>
          X
        </button>
        <nav className={styles.sidebar__nav}>
          <Link className={styles.sidebar__link} to="/" tabIndex={0}>
            Namai
          </Link>
          <Link className={styles.sidebar__link} to="/experts" tabIndex={0}>
            Ekspertai
          </Link>
          {user ? (
            <Link className={styles.sidebar__link} to="/profile" tabIndex={0}>
              Profilis
            </Link>
          ) : (
            <Link className={styles.sidebar__link} to="/login" tabIndex={0}>
              Prisijungti
            </Link>
          )}
        </nav>
        {user && (
          <Button
            className={styles.sidebar__btn}
            onClick={() => {
              setUser(null);
              window.location.href = '/';
            }}
          >
            Atsijungti
          </Button>
        )}
      </div>
      <div className={styles.curtain}></div>
    </div>
  );
};

export default Sidebar;

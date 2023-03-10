import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import useWindowWidth from '../../hooks/useWindowWidth';
import { BREAKPOINT_TABELT } from '../../utils/Constants';
import { Role } from '../../utils/Enums';
import Button from '../button/Button';
import styles from './sidebar.module.scss';

type Props = {
  className?: string;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

const renderLink = (role: Role) => {
  switch (role) {
    case Role.Expert:
      return (
        <Link className={styles.sidebar__link} to="/profile" tabIndex={0}>
          Profilis
        </Link>
      );
    case Role.Admin:
      return (
        <Link className={styles.sidebar__link} to="/admin" tabIndex={0}>
          Administravimas
        </Link>
      );
    default:
      break;
  }
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
          <Link className={styles.sidebar__link} to="/" onClick={() => setHidden(true)} tabIndex={0}>
            Namai
          </Link>
          <Link className={styles.sidebar__link} to="/experts" onClick={() => setHidden(true)} tabIndex={0}>
            Ekspertai
          </Link>
          {!user ? (
            <Link className={styles.sidebar__link} to="/login" onClick={() => setHidden(true)} tabIndex={0}>
              Prisijungti
            </Link>
          ) : (
            renderLink(user.role)
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

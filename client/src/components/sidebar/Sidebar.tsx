import { Link } from 'react-router-dom';

import useWindowWidth from '../../hooks/useWindowWidth';
import { BREAKPOINT_TABELT } from '../../utils/Constants';
import styles from './sidebar.module.scss';

type Props = {
  className?: string;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ className, hidden, setHidden }: Props) => {
  useWindowWidth(BREAKPOINT_TABELT, () => setHidden(true));

  return (
    <div className={hidden ? styles.hidden : ''}>
      <div className={`${styles.sidebar} ${className ?? ''}`}>
        <button className={styles.sidebar__close} onClick={() => setHidden(true)}>
          X
        </button>
        <nav className={styles.sidebar__nav}>
          <Link className={styles.sidebar__link} to="/" tabIndex={0}>
            Home
          </Link>
          <Link className={styles.sidebar__link} to="/experts" tabIndex={0}>
            Experts
          </Link>
          <Link className={styles.sidebar__link} to="/login" tabIndex={0}>
            Login
          </Link>
        </nav>
      </div>
      <div className={styles.curtain}></div>
    </div>
  );
};

export default Sidebar;

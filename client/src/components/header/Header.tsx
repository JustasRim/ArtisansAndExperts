import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { useAxios } from '../../hooks/useAxios';
import { useInteractions } from '../../hooks/useInteract';
import { Role } from '../../utils/Enums';
import Button from '../button/Button';
import moon from './../../assets/moon.svg';
import sun from './../../assets/sun.svg';
import styles from './header.module.scss';

type Props = {
  setSidebarHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

const renderLink = (role: Role) => {
  switch (role) {
    case Role.Expert:
      return (
        <>
          <Link className={styles.header__link} to="/work" tabIndex={0}>
            Darbai
          </Link>
          <Link className={styles.header__link} to="/dashboard" tabIndex={0}>
            Panelė
          </Link>
          <Link className={styles.header__link} to="/profile" tabIndex={0}>
            Profilis
          </Link>
        </>
      );
    case Role.Admin:
      return (
        <Link className={styles.header__link} to="/admin" tabIndex={0}>
          Administravimas
        </Link>
      );
    case Role.Client:
      return (
        <Link className={styles.header__link} to="/dashboard" tabIndex={0}>
          Panelė
        </Link>
      );
    default:
      break;
  }
};

const Header = ({ setSidebarHidden }: Props) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(AuthContext);
  const { ax } = useAxios();

  const { registerInteraction } = useInteractions();

  const handleThemeChange = () => {
    const isCurrentDark = theme === 'dark';
    setTheme(isCurrentDark ? 'light' : 'dark');
    localStorage.setItem('theme', isCurrentDark ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    await ax.post('/token/revoke');
    setUser(null);
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.header__content} container`}>
        <Link to="/" tabIndex={0} className={styles.header__icon}>
          <img src="/logo-transparent.png" alt="icon" />
        </Link>
        <nav className={styles.header__nav}>
          <Link className={styles.header__link} to="/" tabIndex={0}>
            Namai
          </Link>
          {!user ? (
            <>
              <Link className={styles.header__link} to="/login" tabIndex={0}>
                Prisijungti
              </Link>
            </>
          ) : (
            renderLink(user.role)
          )}
        </nav>
        <div className={styles.controls}>
          <div
            className={styles.controls__theme_btn}
            {...registerInteraction(() => handleThemeChange())}
            role="button"
            aria-label="theme"
            tabIndex={0}
          >
            {theme === 'dark' ? <img src={moon} alt="Moon" /> : <img src={sun} alt="Sun" />}{' '}
          </div>
          {user && (
            <Button className={styles.controls__logout} onClick={handleLogout}>
              Atsijungti
            </Button>
          )}
          <div
            className={styles.hamburger}
            {...registerInteraction(() => setSidebarHidden((curr) => !curr))}
            role="button"
            aria-label="hamburger"
            tabIndex={0}
          >
            <div className={styles.hamburger__bar}></div>
            <div className={`${styles.hamburger__bar} ${styles['hamburger__bar--middle']}`}></div>
            <div className={styles.hamburger__bar}></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

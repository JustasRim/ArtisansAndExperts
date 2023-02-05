import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ThemeContext } from '../../context/ThemeContext';
import Switch from '../switch/Switch';
import moon from './../../assets/moon.svg';
import sun from './../../assets/sun.svg';
import styles from './header.module.scss';

type Props = {
  setSidebarHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setSidebarHidden }: Props) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleThemeChange = () => {
    const isCurrentDark = theme === 'dark';
    setTheme(isCurrentDark ? 'light' : 'dark');
    localStorage.setItem('theme', isCurrentDark ? 'light' : 'dark');
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.header__content} container`}>
        <Link to="/" tabIndex={0}>
          <span>A&E</span>
        </Link>
        <nav className={styles.header__nav}>
          <Link className={styles.header__link} to="/" tabIndex={0}>
            Home
          </Link>
          <Link className={styles.header__link} to="/experts" tabIndex={0}>
            Experts
          </Link>
          <Link className={styles.header__link} to="/contact" tabIndex={0}>
            Contact
          </Link>
        </nav>
        <div className={styles.controls}>
          <Switch className={styles.controls__theme} checked={theme === 'dark'} setChecked={handleThemeChange} />
          <div
            className={styles.controls__theme_btn}
            onClick={handleThemeChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleThemeChange();
              }
            }}
            role="button"
            aria-label="theme"
            tabIndex={0}
          >
            {theme === 'dark' ? <img src={moon} alt="Moon" /> : <img src={sun} alt="Sun" />}{' '}
          </div>
          <div
            className={styles.hamburger}
            onClick={() => setSidebarHidden((curr) => !curr)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setSidebarHidden((curr) => !curr);
              }
            }}
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

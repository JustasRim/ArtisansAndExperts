import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ThemeContext } from '../../context/ThemeContext';
import Switch from '../switch/Switch';
import moon from './../../assets/moon.svg';
import sun from './../../assets/sun.svg';
import styles from './header.module.scss';

const Header = () => {
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
        <Switch className={styles.header__theme} checked={theme === 'dark'} setChecked={handleThemeChange} />
        <div
          className={styles.header__theme_btn}
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
      </div>
      <div className={styles.hamburger}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
};

export default Header;

import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ThemeContext } from '../../context/ThemeContext';
import Switch from '../switch/Switch';
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
        <Link to="/">
          <span>A&E</span>
        </Link>
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/experts">Experts</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <Switch checked={theme === 'dark'} setChecked={handleThemeChange} />
      </div>
    </header>
  );
};

export default Header;

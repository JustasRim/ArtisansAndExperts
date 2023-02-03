import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/header/Header';
import { ThemeContext } from '../context/ThemeContext';

function Root() {
  const isBrowserDefaultDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem('default-theme');
    const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light';
    return localStorageTheme || browserDefault;
  };

  const [theme, setTheme] = useState(getDefaultTheme() ? 'light' : 'dark');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        <Header />
        <Outlet />
      </div>
    </ThemeContext.Provider>
  );
}

export default Root;

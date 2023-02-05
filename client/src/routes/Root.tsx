import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import { ThemeContext } from '../context/ThemeContext';

function Root() {
  const isBrowserDefaultDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem('theme');
    const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light';
    return localStorageTheme || browserDefault;
  };

  const [theme, setTheme] = useState(getDefaultTheme());
  const [hidden, setHidden] = useState<boolean>(false);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        <div className="bg">
          <Header setSidebarHidden={setHidden} />
          <Sidebar hidden={hidden} setHidden={setHidden} />
          <Outlet />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default Root;

import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';

function Root() {
  const isBrowserDefaultDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem('theme');
    const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light';
    return localStorageTheme || browserDefault;
  };

  const [theme, setTheme] = useState(getDefaultTheme());
  const [hidden, setHidden] = useState<boolean>(true);

  const { user, login: setUser } = useAuth();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`theme-${theme}`}>
          <div className="bg">
            <Header setSidebarHidden={setHidden} />
            <Sidebar hidden={hidden} setHidden={setHidden} />
            <main className="container">
              <Outlet />
            </main>
          </div>
        </div>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

export default Root;

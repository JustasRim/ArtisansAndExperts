import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Outlet } from 'react-router-dom';

import { Footer } from '../components/footer/Footer';
import Header from '../components/header/Header';
import { QueryProvider } from '../components/queryProvider/QueryProvider';
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
      <QueryProvider>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <div className={`theme-${theme}`}>
            <div className="bg">
              <Header setSidebarHidden={setHidden} />
              <Sidebar hidden={hidden} setHidden={setHidden} />
              <div className="paddingTop"></div>
              <main className="container">
                <Outlet />
              </main>
              <Footer></Footer>
            </div>
          </div>
        </ThemeContext.Provider>
        <ReactQueryDevtools />
      </QueryProvider>
    </AuthContext.Provider>
  );
}

export default Root;

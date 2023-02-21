import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Admin } from './components/admin/Admin';
import { Clients } from './components/admin/clients/Clients';
import { Experts } from './components/admin/experts/Experts';
import Login from './components/login/Login';
import { Profile } from './components/profile/Profile';
import Register from './components/register/Register';
import Error404 from './pages/Error404';
import { Protected } from './routes/Protected';
import Root from './routes/Root';
import './styles/index.scss';
import { Role } from './utils/Enums';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./serviceWorker.js');
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'sign-up',
        element: <Register />,
      },
      {
        path: 'profile',
        element: (
          <Protected roles={[Role.Expert, Role.Admin]}>
            <Profile />
          </Protected>
        ),
      },
      {
        path: 'admin',
        element: (
          <Protected roles={[Role.Admin]}>
            <Admin />
          </Protected>
        ),
        children: [
          {
            path: 'clients',
            element: (
              <Protected roles={[Role.Admin]}>
                <Clients />
              </Protected>
            ),
          },
          {
            path: 'experts',
            element: (
              <Protected roles={[Role.Admin]}>
                <Experts />
              </Protected>
            ),
          },
        ],
      },
      { path: '*', element: <Error404 /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

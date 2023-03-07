import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Admin } from './components/admin/Admin';
import { AdminClients } from './components/admin/clients/AdminClients';
import { AdminExperts } from './components/admin/experts/AdminExperts';
import { Preview } from './components/admin/preview/Preview';
import { ConfirmEmail } from './components/confirmEmail/ConfirmEmail';
import { Dashboard } from './components/dashboard/Dashboard';
import { Experts } from './components/experts/Experts';
import Login from './components/login/Login';
import { Offer } from './components/offer/Offer';
import { PasswordReset } from './components/passwordReset/PasswordReset';
import { PasswordResetRequest } from './components/passwordResetRequest/PasswordResetRequest';
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
        path: 'password-reset-request',
        element: <PasswordResetRequest />,
      },
      {
        path: 'password-reset',
        element: <PasswordReset />,
      },
      {
        path: 'confirm-email',
        element: <ConfirmEmail />,
      },
      {
        path: 'dashboard',
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: 'offer',
        element: (
          <Protected>
            <Offer />
          </Protected>
        ),
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
                <AdminClients />
              </Protected>
            ),
          },
          {
            path: 'experts',
            element: (
              <Protected roles={[Role.Admin]}>
                <AdminExperts />
              </Protected>
            ),
          },
          {
            path: 'preview',
            element: (
              <Protected roles={[Role.Admin]}>
                <Preview />
              </Protected>
            ),
          },
        ],
      },
      {
        path: 'experts',
        element: <Experts />,
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

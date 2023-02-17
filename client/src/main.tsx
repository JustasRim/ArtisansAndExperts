import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Login from './components/login/Login';
import { Profile } from './components/profile/Profile';
import Register from './components/register/Register';
import Error404 from './pages/Error404';
import Root from './routes/Root';
import './styles/index.scss';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./serviceWorker.js');
}

const queryClient = new QueryClient();

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
        element: <Profile />,
      },
      { path: '*', element: <Error404 /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </React.StrictMode>
  </QueryClientProvider>
);

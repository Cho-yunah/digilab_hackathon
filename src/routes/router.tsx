import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import MainLayout from '../layouts/MainLayout';
import DetailPage from '@/pages/DetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/:id',
        element: <DetailPage />,
      },
    ],
  },
  {
    path: '*',
    element: <div>Page Not Found</div>,
  },
]);

export default router;

import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/Home/HomePage';
import DetailPage from '@/pages/DetailPage';
import FacilityInfoPage from '@/pages/FacilityInfoPage';

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
      {
        path: '/:id/facility',
        element: <FacilityInfoPage />,
      },
    ],
  },
  {
    path: '*',
    element: <div>Page Not Found</div>,
  },
]);

export default router;

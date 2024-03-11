import { Outlet, useRoutes } from 'react-router-dom';
import Safari from '../pages/Safari';
import LandingPage from '../pages/LandingPage';

const LandingRoute = {
  path: '/',
  element: <LandingPage />,
};

const CommonRoutes = {
  path: '/',
  element: <Outlet />,
  children: [
    {
      path: 'safari',
      element: <Safari />,
    },
  ],
};

export default function ThemeRoutes() {
  return useRoutes([LandingRoute, CommonRoutes]);
}

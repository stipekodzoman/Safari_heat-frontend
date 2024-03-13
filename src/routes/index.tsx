import { Outlet, useRoutes } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Safari from '../pages/Safari';
import SafariHelp from '../pages/Safari/Help';
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
      children: [
        {
          path: '',
          element: <Safari />,
        },
        {
          path: 'help',
          element: <SafariHelp />,
        },
      ],
    },
  ],
};

export default function ThemeRoutes() {
  return useRoutes([LandingRoute, CommonRoutes]);
}

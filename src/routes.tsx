import { RouteObject } from 'react-router';
import Logout from './components/Logout';
import RedirectToStrava from './components/RedirectToStrava';
import Main from './components/screens/Main';
import ActivityDetail from './components/screens/ActivityDetail';
import StravaCallback from './components/StravaCallback';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/activities/:id',
    element: <ActivityDetail />,
  },
  {
    path: '/login/strava',
    element: <RedirectToStrava />,
  },
  {
    path: '/oauth/callback/strava',
    element: <StravaCallback />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
];

export default routes;

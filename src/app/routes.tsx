import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Dashboard } from './pages/Dashboard';
import { Rankings } from './pages/Rankings';
import { MapView } from './pages/MapView';
import { CityDetail } from './pages/CityDetail';
import { Compare } from './pages/Compare';
import { Methodology } from './pages/Methodology';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: 'rankings', Component: Rankings },
      { path: 'map', Component: MapView },
      { path: 'city/:id', Component: CityDetail },
      { path: 'compare', Component: Compare },
      { path: 'methodology', Component: Methodology },
      { path: '*', Component: NotFound },
    ],
  },
]);

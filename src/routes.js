import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Playground = lazy(() => import('./pages/Playground'));

export const routes = [
  {
    key: 'home',
    label: 'Home',
    path: '/',
    exact: true,
    Component: Home,
  },
  {
    key: 'about',
    label: 'About',
    path: '/about',
    exact: true,
    Component: About,
  },
  {
    key: 'playground',
    label: 'Playground',
    path: '/playground',
    exact: true,
    Component: Playground,
  },
];

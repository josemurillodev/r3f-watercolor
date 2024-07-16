import { LazyExoticComponent } from 'react';

import HomeScreen from './home';
import NotFoundScreen from './notfound';

export enum RouteKeys {
  Home = 'Home',
  NotFound = 'NotFound',
}

export type AppRouteItem = {
  url: string;
  path: string;
  name: string;
  visible: boolean;
  key: RouteKeys;
  items: AppRouteItem[];
};

export type AppRoute = AppRouteItem & {
  component: (() => JSX.Element) | LazyExoticComponent<React.FC<any>>;
};

const base = import.meta.env.BASE_URL;

export const ROUTES: AppRouteItem[] = [
  {
    url: '/',
    path: '/*',
    name: 'Home',
    key: RouteKeys.Home,
    items: [],
    visible: true,
  },
  {
    url: base,
    path: `${base}*`,
    name: 'Home',
    key: RouteKeys.Home,
    items: [],
    visible: true,
  },
];

const ROUTES_COMPONENTS = {
  [RouteKeys.Home]: HomeScreen,
  [RouteKeys.NotFound]: NotFoundScreen,
};

const getRoutesTree = (items: AppRouteItem[], r: AppRoute[] = []) => {
  items.map((o) => {
    if (o.items?.length) {
      getRoutesTree(o.items, r);
    } else {
      r.push({
        ...o,
        component: ROUTES_COMPONENTS[o.key],
      });
    }
    return true;
  });
  return r;
};

export const routes = getRoutesTree(ROUTES);

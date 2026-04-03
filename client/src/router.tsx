import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import { DashboardPage } from './pages/DashboardPage';
import { RepositoryExplorerPage } from './pages/RepositoryExplorerPage';
import { SearchPage } from './pages/SearchPage';

const rootRoute = createRootRoute({
  component: Outlet,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/search',
  component: SearchPage,
});

const repositoryExplorerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/repository-explorer',
  component: RepositoryExplorerPage,
});

const routeTree = rootRoute.addChildren([homeRoute, searchRoute, repositoryExplorerRoute]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

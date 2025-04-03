import { lazy } from 'react';

// 📌 Importation des pages dynamiquement (lazy loading)
const Dashboard = lazy(() => import('../pages/protected/Dashboard'));
const DashboardRh = lazy(() => import('../pages/protected/DashboardRh'));
const Leads = lazy(() => import('../pages/protected/Leads'));
const Transactions = lazy(() => import('../pages/protected/Transactions'));
const Charts = lazy(() => import('../pages/protected/Charts'));
const Integration = lazy(() => import('../pages/protected/Integration'));
const Calendar = lazy(() => import('../pages/protected/Calendar'));
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'));
const Bills = lazy(() => import('../pages/protected/Bills'));
const Team = lazy(() => import('../pages/protected/Team'));
const GettingStarted = lazy(() => import('../pages/GettingStarted'));
const Page404 = lazy(() => import('../pages/protected/404'));
const Blank = lazy(() => import('../pages/protected/Blank'));

// 📌 Routes générales
const routes = [
  { path: '/404', component: Page404 },
  { path: '/blank', component: Blank },
];

// 📌 Routes pour l'Admin
const adminRoutes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/leads', component: Leads },
  { path: '/transactions', component: Transactions },
  { path: '/charts', component: Charts },
  { path: '/integration', component: Integration },
  { path: '/settings-team', component: Team },
];

// 📌 Routes pour le RH
const rhRoutes = [
  { path: '/dashboardRh', component: DashboardRh },
  { path: '/calendar', component: Calendar },
  { path: '/settings-profile', component: ProfileSettings },
  { path: '/settings-billing', component: Bills },
  { path: '/getting-started', component: GettingStarted },
];

export { adminRoutes, rhRoutes };
export default routes;

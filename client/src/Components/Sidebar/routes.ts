import {
  House,
  Person,
  Search,
  AppRegistration,
  Dashboard,
  SupportAgent,
  AccountCircle,
  Pattern,
} from '@mui/icons-material';
import { SidebarRoutesArray } from './SidebarMenu';

const routes: Array<SidebarRoutesArray> = [
  {
    path: '', // default path
    name: 'Dashboard',
    icon: House,
  },
  {
    path: 'update',
    name: 'ערוך מידע',
    icon: AppRegistration,
    subRoutes: [
      {
        path: 'update/dashboardsNew',
        name: 'דשבורדים',
        icon: Dashboard,
      },
      {
        path: 'update/environments',
        name: 'סביבות',
        icon: SupportAgent,
      },
      {
        path: 'update/users',
        name: 'משתמשים',
        icon: Person,
      },
    ],
  },
  {
    path: 'user/Profile',
    name: 'פרופיל',
    icon: AccountCircle,
  },
  {
    path: 'user/UpdatePassword',
    name: 'שינוי סיסמה',
    icon: Pattern,
  },
  {
    path: '/',
    name: 'לדף הבית',
    icon: Dashboard,
  },
  {
    path: '/search',
    name: 'דף חיפוש דשבורדים',
    icon: Search,
  },
];
export default routes;

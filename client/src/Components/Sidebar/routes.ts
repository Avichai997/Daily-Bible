import { House, Storage, AppRegistration, AccountCircle, Pattern } from '@mui/icons-material';
import { SidebarRoutesArray } from './SidebarMenu';

const routes: SidebarRoutesArray[] = [
  {
    path: '/', // default path
    name: 'בית',
    icon: House,
  },
  {
    path: '/posts',
    name: 'דברי תורה',
    icon: House,
  },
  {
    path: 'update',
    name: 'הגדרות',
    icon: AppRegistration,
    subRoutes: [
      {
        path: 'Profile',
        name: 'עריכת פרופיל',
        icon: AccountCircle,
      },
      {
        path: 'UpdatePassword',
        name: 'שינוי סיסמה',
        icon: Pattern,
      },
    ],
  },
  {
    path: 'Posts',
    name: 'דברי תורה',
    icon: Storage,
  },
];
export default routes;

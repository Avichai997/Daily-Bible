import { House, Storage, AppRegistration, AccountCircle, Pattern, Info } from '@mui/icons-material';
import { SidebarRoutesArray } from './SidebarMenu';

const routes: SidebarRoutesArray[] = [
  {
    path: '/', // default path
    name: 'בית',
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
    path: 'WhyDailyBible',
    name: 'למה תנ"ך יומי',
    icon: Info,
  },
  {
    path: 'Posts',
    name: 'דברי תורה',
    icon: Storage,
  },
];
export default routes;

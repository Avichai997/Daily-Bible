import './Navbar.scss';
import {
  AccountCircle,
  ChatBubbleOutlined,
  DarkModeOutlined,
  FullscreenExitOutlined,
  LanguageOutlined,
  Logout,
  NotificationsNoneOutlined,
  Settings,
} from '@mui/icons-material';
import { useUser } from '@ApiService/Requests/useUser';
import { useNavigate } from 'react-router-dom';
import Dropdown from '@Components/Dropdown';
import { useAuth } from '@ApiService/Requests/useAuth';
import { IconButton, Tooltip } from '@mui/material';
import { MuiIcon, ReactSetState } from '@CommonInterfaces';
import NotificationCenter from './NotificationCenter/NotificationCenter';

type NavProp = {
  icon?: MuiIcon;
  title?: string;
  onClick?: () => void;
  divider?: boolean;
};

interface INavbar {
  isOpen: boolean;
  setIsOpen: ReactSetState<boolean>;
}

const Navbar = ({ setIsOpen, isOpen }: INavbar) => {
  const { user } = useUser();
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const userMenuItems: NavProp[] = [
    {
      icon: AccountCircle,
      title: 'פרופיל',
      onClick: () => navigate('/Profile'),
    },
    {
      divider: true,
    },
    {
      icon: Settings,
      title: 'הגדרות',
      onClick: () => navigate('/Settings'),
    },
    {
      icon: Logout,
      title: 'התנתק',
      onClick: () => logoutUser(),
    },
  ];

  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='items'>
          <LanguageOutlined className='item' />
          <DarkModeOutlined className='item' />
          <FullscreenExitOutlined className='item' />
          <div className='item'>
            <Tooltip title='חלון הודעות' followCursor>
              <IconButton onClick={() => setIsOpen(true)}>
                <NotificationsNoneOutlined className='bell' />
              </IconButton>
            </Tooltip>

            <NotificationCenter isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <ChatBubbleOutlined className='item' />
          <Dropdown
            items={userMenuItems}
            alt={user?.name || ''}
            avatarImageSrc={`${import.meta.env.VITE_API_URL}/img/users/${user?.photo}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

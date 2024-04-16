import { useState } from 'react';
import {
  MenuItem,
  ListItemText,
  ListItemIcon,
  Menu,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import RtlProvider from '@Utils/RtlProvider';
import { MuiIcon } from '@CommonInterfaces';
import * as React from 'react';

export interface IDropdown {
  items: Array<IDropdownItem>;
  avatarImageSrc: string;
  alt: string;
}
export interface IDropdownItem {
  icon?: MuiIcon;
  title?: string;
  onClick?: () => void;
  divider?: boolean;
}

const Dropdown = ({ items, avatarImageSrc, alt }: IDropdown) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = !!anchorEl;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <RtlProvider>
      <Tooltip title='פרופיל'>
        <IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
          <Avatar sx={{ width: 32, height: 32 }} alt={alt} src={avatarImageSrc} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {items.map((item: IDropdownItem, index: number) => {
          const Icon = item.icon as MuiIcon;

          return item.divider ? (
            <Divider key={index} />
          ) : (
            <MenuItem onClick={item.onClick} key={index}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText>{item.title}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </RtlProvider>
  );
};

export default Dropdown;

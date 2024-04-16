/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center';
import { Icons } from 'react-toastify';
import { Button, IconButton, Tooltip } from '@mui/material';
import { Close } from '@mui/icons-material';
import Switch from '@Components/Switch/Switch';
import { ReactSetState } from '@CommonInterfaces';
import ItemActions from './ItemActions';
import TimeTracker from './TimeTracker';
import classes from './NotificationCenter.module.scss';
import { Trigger } from './Trigger';

interface INotificationCenter {
  isOpen: boolean;
  setIsOpen: ReactSetState<boolean>;
}

const PurpleButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  return (
    <Button
      variant='outlined'
      onClick={onClick}
      size='small'
      sx={{
        color: 'var(--purple)',
        backgroundColor: 'white',
        borderColor: 'white',
        fontWeight: 'bold',
        ':hover': {
          bgcolor: '#ded6ff',
          borderColor: 'white',
        },
      }}
    >
      {text}
    </Button>
  );
};

const NotificationCenter = ({ setIsOpen, isOpen }: INotificationCenter) => {
  const { notifications, clear, markAllAsRead, markAsRead, remove, unreadCount } =
    useNotificationCenter();

  const [showUnreadOnly, toggleFilter] = useState(false);
  const changeToggleFilter = () => {
    toggleFilter(!showUnreadOnly);
  };

  return (
    <>
      <Trigger count={unreadCount} />
      {isOpen && (
        <div style={{ position: 'absolute', zIndex: '999', padding: -5 }}>
          <div className={classes.container}>
            <header>
              <h3>התראות</h3>
              <div className={classes.partHeader}>
                <div className={classes.unreadFilter}>
                  <label htmlFor='unread-filter'>הצג הודעות שלא נקראו</label>
                  <Switch
                    toggleFn={changeToggleFilter}
                    switchSx={{ width: '60px' }}
                    titleOff='הצג את כל ההודעות'
                    titleOn='הצג הודעות שלא נקראו'
                  />
                </div>

                <Tooltip title='סגור' placement='left' followCursor className={classes.closeButton}>
                  <IconButton onClick={() => setIsOpen(!isOpen)} sx={{ borderRadius: 0 }}>
                    <Close />
                  </IconButton>
                </Tooltip>
              </div>
            </header>
            <AnimatePresence>
              <div className={classes.content}>
                {(!notifications.length || (unreadCount === 0 && showUnreadOnly)) && (
                  <motion.h4
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    היסטוריית ההודעות שלך ריקה !
                    <span role='img' aria-label='dunno what to put'>
                      🎉
                    </span>
                  </motion.h4>
                )}
                <AnimatePresence>
                  {(showUnreadOnly ? notifications.filter((v) => !v.read) : notifications).map(
                    (notification) => {
                      return (
                        <motion.div
                          key={notification.id}
                          layout
                          initial={{ scale: 0.4, opacity: 0, y: 50 }}
                          exit={{
                            scale: 0,
                            opacity: 0,
                            transition: { duration: 0.2 },
                          }}
                          animate={{ scale: 1, opacity: 1, y: 0 }}
                          style={{ padding: '0.8rem' }}
                        >
                          <div key={notification.id} className={classes.item}>
                            <div className={classes.iconWrapper}>
                              <>
                                {notification.icon ||
                                  Icons.info({
                                    theme: notification.theme || 'light',
                                    type: notification.type!,
                                  })}
                              </>
                            </div>
                            <div className={classes.infoToast}>
                              <>{notification.content}</>
                              <TimeTracker createdAt={notification.createdAt} />
                            </div>
                            <ItemActions
                              notification={notification}
                              markAsRead={markAsRead}
                              remove={remove}
                            />
                          </div>
                        </motion.div>
                      );
                    }
                  )}
                </AnimatePresence>
              </div>
            </AnimatePresence>

            <footer className={classes.footer}>
              <PurpleButton text='נקה הכל' onClick={clear} />
              <PurpleButton text='סימון הכל כנקרא' onClick={markAllAsRead} />
            </footer>
          </div>
        </div>
      )}
    </>
  );
};
export default NotificationCenter;

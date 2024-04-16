import type {
  NotificationCenterItem,
  UseNotificationCenter,
} from 'react-toastify/addons/use-notification-center';
import { Delete, Check } from '@mui/icons-material';
import './ItemActions.scss';

interface IItemActions extends Pick<UseNotificationCenter<object>, 'markAsRead' | 'remove'> {
  notification: NotificationCenterItem;
}

const ItemActions = ({ notification, markAsRead, remove }: IItemActions) => {
  return (
    <div className='wrapper'>
      {notification.read ? (
        <Check sx={{ color: 'green' }} />
      ) : (
        <div
          className='button'
          title='סמן כנקרא'
          onClick={() => {
            markAsRead(notification.id);
          }}
        >
          <main className='circle'>
            <div className='ring' />
          </main>
        </div>
      )}
      <div className='button' onClick={() => remove(notification.id)} title='מחיקה'>
        <Delete />
      </div>
    </div>
  );
};
export default ItemActions;

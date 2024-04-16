import Swal, { SweetAlertOptions } from 'sweetalert2';
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import 'react-toastify/dist/ReactToastify.css';

const ToastConfirmDialog = async ({
  title = 'אתה בטוח?',
  text = 'לא תוכל לבטל את השינויים',
  icon = 'question',
  confirmButtonText = 'כן, אני בטוח',
  showCancelButton = true,
  cancelButtonText = 'ביטול',
  cancelButtonColor = '#d33',
  confirmButtonColor = '#3085d6',
}: SweetAlertOptions) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
    cancelButtonText,
    cancelButtonColor,
    confirmButtonText,
    confirmButtonColor,
  });

  return result.isConfirmed;
};

const showToast = (title: string, type: 'success' | 'error' | 'info', options?: ToastOptions) => {
  toast(title, {
    ...options,
    type,
  });
};

const ToastSuccess = async (title = 'בוצע בהצלחה!', options?: ToastOptions) =>
  showToast(title, 'success', options);

const ToastError = async (title = 'שגיאה', options?: ToastOptions) =>
  showToast(title, 'error', options);

const ToastInfo = async (title = 'שים לב!', options?: ToastOptions) =>
  showToast(title, 'info', options);

export { ToastConfirmDialog, ToastSuccess, ToastError, ToastInfo };

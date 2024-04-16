import { createPortal } from 'react-dom';
import { ToastContainer } from 'react-toastify';

const ToastsContainer = () => {
  return createPortal(
    <ToastContainer
      rtl
      toastStyle={{
        textAlign: 'right',
        direction: 'rtl',
      }}
    />,
    document.getElementById('toastPortal') as HTMLElement
  );
};

export default ToastsContainer;

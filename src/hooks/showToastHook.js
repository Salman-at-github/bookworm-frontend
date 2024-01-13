import { toast } from 'react-toastify';

export const useShowToast = () => {
  const showToast = (type, message) => {
    toast[type](message, {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return showToast;
};

import { toast } from 'react-hot-toast';

export default function useToast() {
  const showSuccess = (message) => {
    toast.success(message, {
      duration: 2000,
    });
  };

  const showError = (message) => {
    toast.error(message, {
      duration: 2000,
    });
  };

  const showInfo = (message) => {
    toast(message, {
      icon: 'ℹ️',
      duration: 2000,
    });
  };

  const showCustom = (message, options = {}) => {
    toast(message, {
      ...options,
    });
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showCustom,
  };
}

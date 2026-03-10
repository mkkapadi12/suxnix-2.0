import { PAGE_ICONS } from '@/lib/icons/page.icons';
import { toast } from 'sonner';

export const useToast = () => {
  const showToast = ({
    title,
    description,
    type = 'default', // success | error | warning | info
    position = 'top-right',
    icon,
    duration = 3000,
  }) => {
    const iconMap = {
      success: PAGE_ICONS.CHECKCIRCLE,
      error: PAGE_ICONS.XCIRCLE,
      warning: PAGE_ICONS.ALERTTRIANGLE,
      info: PAGE_ICONS.INFO,
    };

    const SelectedIcon = icon ? PAGE_ICONS[icon] : iconMap[type];

    toast(title, {
      description,
      duration,
      position,
      icon: SelectedIcon ? <SelectedIcon className="h-5 w-5" /> : undefined,
      className: 'rounded-xl',
    });
  };

  return { showToast };
};

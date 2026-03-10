import { useMemo } from 'react';

export const useShopButton = ({
  size = 'md',
  bgColor = '#faa432',
  hoverColor = '#0d9b4d',
}) => {
  const sizes = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-10 py-4 text-base',
    lg: 'px-14 py-5 text-lg',
  };

  const buttonSize = useMemo(() => sizes[size] || sizes.md, [size]);

  return {
    buttonSize,
    bgColor,
    hoverColor,
  };
};

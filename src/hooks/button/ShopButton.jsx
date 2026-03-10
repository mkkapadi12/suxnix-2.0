import React from 'react';
import { Link } from 'react-router-dom';
import { useShopButton } from './useShopButton';

const ShopButton = ({
  size = 'md',
  path = '',
  title = 'Shop Now',
  bgColor = '#faa432',
  hoverColor = '#0d9b4d',
  fullWidth = true,
}) => {
  const { buttonSize } = useShopButton({
    size,
    bgColor,
    hoverColor,
  });

  return (
    <Link
      to={`/shop/${path}`}
      className={`
        relative inline-block overflow-hidden
        rounded-full border-[3px] border-white
        text-white font-bold capitalize
        leading-[1.4] whitespace-nowrap
        transition-all duration-500
        z-1 group text-center
        ${buttonSize}
        ${fullWidth ? 'w-full' : ''}
      `}
      style={{ backgroundColor: bgColor }}
    >
      {/* Animated Hover Layer */}
      <span
        className="
          absolute -z-10
          w-[200%] h-[200%]
          rounded-full
          left-1/2 top-[110%]
          -translate-x-1/2
          transition-all duration-700
          group-hover:top-[-40%]
        "
        style={{ backgroundColor: hoverColor }}
      />
      {title}
    </Link>
  );
};

export default ShopButton;

import {
  homenavigation,
  newsnavigation,
  shopnavigation,
} from '@/constants/navbar';

export const NAV_ITEMS = [
  {
    type: 'dropdown',
    title: 'Home',
    items: homenavigation,
  },
  {
    type: 'link',
    title: 'Features',
    path: '/features',
  },
  {
    type: 'link',
    title: 'Product',
    path: '/product',
  },
  // {
  //   type: 'link',
  //   title: 'Ingredients',
  //   path: '/ingredients',
  // },
  // {
  //   type: 'link',
  //   title: 'Pricing',
  //   path: '/pricing',
  // },
  {
    type: 'dropdown',
    title: 'Shop',
    items: shopnavigation,
  },
  {
    type: 'dropdown',
    title: 'News',
    items: newsnavigation,
  },
  {
    type: 'link',
    title: 'Contacts',
    path: '/contact',
  },
];

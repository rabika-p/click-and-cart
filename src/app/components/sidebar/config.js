import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BookIcon from '@mui/icons-material/Book';
import ThreePIcon from '@mui/icons-material/ThreeP';

import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Products',
    path: '/products',
    icon: (
      <SvgIcon fontSize="small">
        <Inventory2Icon />
      </SvgIcon>
    )
  },
  {
    title: 'My Cart',
    path: '/cart',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingCartIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Blog',
    path: '/blog',
    icon: (
      <SvgIcon fontSize="small">
        <BookIcon />
      </SvgIcon>
    )
  },
  {
    title: 'My Posts',
    path: '/posts',
    icon: (
      <SvgIcon fontSize="small">
        <ThreePIcon />
      </SvgIcon>
    )
  },
 
];

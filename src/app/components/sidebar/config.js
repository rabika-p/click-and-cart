import { useSelector } from "react-redux";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookIcon from "@mui/icons-material/Book";
import ThreePIcon from "@mui/icons-material/ThreeP";

import { Badge } from "@mui/material";
import { SvgIcon } from "@mui/material";

// const cartItems = useSelector((state) => state.carts.cartItems);
// // Calculate the total number of items in the cart
// const totalItemsInCart = cartItems.reduce(
//   (total, item) => total + item.quantity,
//   0
// );

export const items = [
  {
    title: "Products",
    path: "/products",
    icon: (
      <SvgIcon fontSize="small">
        <Inventory2Icon />
      </SvgIcon>
    ),
  },
  {
    title: "My Cart",
    path: "/my-cart",
    icon: (
      // <Badge
      //   color="error"
      //   badgeContent={totalItemsInCart}
      //   overlap="circular"
      //   anchorOrigin={{
      //     vertical: "top",
      //     horizontal: "right",
      //   }}
      // >
        <SvgIcon fontSize="small">
          <ShoppingCartIcon />
        </SvgIcon>
      // </Badge>
    ),
  },
  {
    title: "Blog",
    path: "/blog",
    icon: (
      <SvgIcon fontSize="small">
        <BookIcon />
      </SvgIcon>
    ),
  },
  {
    title: "My Posts",
    path: "/posts",
    icon: (
      <SvgIcon fontSize="small">
        <ThreePIcon />
      </SvgIcon>
    ),
  },
];

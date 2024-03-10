"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Drawer, Stack } from "@mui/material";
import { items } from "./config";
import SideNavItem from "./SideNavItem";
import { useSelector } from "react-redux";

const SideNav = () => {
  const pathname = usePathname();
  const { isAdmin } = useSelector((state) => state.users);

  const filteredItems = items.filter((item) => {
    if (isAdmin) {
      // For admin, filter out specific paths
      return !["/my-cart", "/blogs", "/my-posts"].includes(item.path);
    }
    // Include all items for users
    return true;
  });

  return (
    <Drawer
      anchor="left"
      PaperProps={{
        sx: {
          border: "none",
          width: 1 / 6,
        },
      }}
      variant="permanent"
    >
      <Box className="flex flex-col h-full bg-gray-800 text-white">
        <Box className="p-6">
          <Link href="/" className="flex items-center">
            <img src="/assets/logo.png" className="max-h-10 max-w-full" />
          </Link>
        </Box>
        <Box component="nav" className="flex-grow px-4 py-3">
          <Stack component="ul" spacing={0.5} className="list-none p-0 m-0">
            {filteredItems.map((item) => {
              const active = item.path ? pathname === item.path : false;
              return (
                <SideNavItem
                  active={active}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                  icon={item.icon}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SideNav;

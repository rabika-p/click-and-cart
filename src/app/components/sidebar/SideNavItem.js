import NextLink from "next/link";
import { Box, ButtonBase } from "@mui/material";

const SideNavItem = ({ active = false, icon, path, title }) => {
  const linkProps = path ? { component: NextLink, href: path } : {};

  return (
    <li>
      <ButtonBase
        className={`flex items-center justify-start pl-4 pr-4 py-3 w-full ${
          active && "bg-gray-600"
        }`}
        {...linkProps}
      >
        {icon && <Box className="mr-2">{icon}</Box>}
        <Box
          className={`flex-grow font-semibold text-sm leading-6 whitespace-nowrap ${
            active ? "text-white" : "text-gray-300"
          }`}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};

export default SideNavItem;

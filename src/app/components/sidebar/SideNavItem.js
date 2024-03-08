import NextLink from "next/link";
import { Box, ButtonBase } from "@mui/material";

const SideNavItem = ({ active = false, icon, path, title }) => {
  const linkProps = path ? { component: NextLink, href: path } : {};

  return (
    <li>
    <ButtonBase
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
        width: '100%',
        backgroundColor: active ? '#4a5568' : '',
      }}
      {...linkProps}
    >
      {icon && <Box style={{ marginRight: '0.5rem' }}>{icon}</Box>}
      <Box
        style={{
          flexGrow: 1,
          fontWeight: 'bold',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          whiteSpace: 'nowrap',
          color: active ? '#ffffff' : '#e2e5ea',
        }}
      >
        {title}
      </Box>
    </ButtonBase>
  </li>
  
  );
};

export default SideNavItem;

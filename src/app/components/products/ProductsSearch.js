import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const ProductsSearch = () => (
  // <Card sx={{ p: 2 }}>
    <OutlinedInput 
      defaultValue=""
      fullWidth
      placeholder="Search product"
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <SearchIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500, height: 50}}
    />
);
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SvgIcon,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectCategories } from "@/features/productsSlice";
import useDebounce from "@/hooks/useDebounce";

export const ProductsSearch = ({ handleSearch }) => {
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);

  const categories = useSelector(selectCategories);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === category) {
      setCategory("");
    } else {
      setCategory(selectedCategory);
    }
    handleSearch(debouncedSearchQuery, selectedCategory);
  };

  const handleInputChange = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    handleSearch(newSearchQuery, category);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1%",
      }}
    >
      <OutlinedInput
        value={searchQuery}
        onChange={handleInputChange}
        fullWidth
        placeholder="Search product"
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <SearchIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 400, height: "50px", marginRight: "30px" }}
      />
      <div className="flex items-center">
        <InputLabel id="category-label">Filter by Category:</InputLabel>
        <Select
          value={category}
          onChange={handleCategoryChange}
          displayEmpty
          inputProps={{ "aria-label": "Select category" }}
          sx={{ width: "160px", height: "50px", marginLeft: "10px" }}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

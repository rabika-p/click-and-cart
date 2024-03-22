import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export const ProductCard = (props) => {
  const { product, handleDelete } = props;
  const { isAdmin } = useSelector((state) => state.users);
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/edit-product/${product.id}`);
  };

  const handleView = () => {
    router.push(`/products/${product.id}`);
  };

  // const truncateDescription = (description) => {
  //   return description.length > 50
  //     ? description.slice(0, 50) + "..."
  //     : description;
  // };

  const renderActions = () => {
    if (isAdmin) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            style={{
              backgroundColor: "#54C4CD",
              color: "white",
              "&:hover": {
                backgroundColor: "#23C5D2",
              },
            }}
            onClick={handleView}
          >
            <VisibilityIcon />
          </IconButton>

          <div>
            <IconButton
              style={{
                backgroundColor: "#698bf4",
                color: "white",
                "&:hover": {
                  backgroundColor: "#6182e6",
                },
              }}
              onClick={handleEdit}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              style={{
                backgroundColor: "#f46b6b",
                color: "white",
                marginLeft: "0.5rem",
                "&:hover": {
                  backgroundColor: "#e66363",
                },
              }}
              onClick={() => handleDelete(product.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            style={{
              backgroundColor: "#6b9cf4",
              color: "white",
              "&:hover": {
                backgroundColor: "#6592e5",
              },
            }}
            onClick={handleView}
          >
            <VisibilityIcon />
          </IconButton>

          {/* <IconButton
            style={{
              backgroundColor: "#6b9cf4",
              color: "white",
              "&:hover": {
                backgroundColor: "#6592e5",
              },
            }}
          >
            <ShoppingCartOutlinedIcon />
          </IconButton> */}
        </div>
      );
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <img
            className="h-48 object-fill"
            src={product.thumbnail}
            alt={product.title}
          />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {product.title}
        </Typography>
        <Typography align="center" variant="body1">
          {product.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <AttachMoneyIcon className="bg-red" />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {product.price}{" "}
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <StarIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {product.rating}
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ p: 2, textAlign: "center" }}>
        {renderActions()}
      </Box>
    </Card>
  );
};

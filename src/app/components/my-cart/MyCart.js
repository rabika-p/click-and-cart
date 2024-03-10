import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "@/app/slices/cartsSlice";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const MyCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.carts.cartItems);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <Container className="max-w-5xl flex flex-wrap items-center flex-col">
      <Typography variant="h5" component="div" gutterBottom>
        <ShoppingCartOutlinedIcon
          fontSize="large"
          style={{ marginRight: "10px" }}
        />
        My Cart
      </Typography>
      {!cartItems || cartItems.length === 0 ? (
        <Typography variant="h6" align="center">
          No items in your cart
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cartItems.map((item) => (
              <Grid item xs={12} key={item.product.id}>
                <Paper variant="outlined" style={{ borderRadius: "10px" }}>
                  <CardContent
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <CardMedia
                      component="img"
                      image={item.product.thumbnail}
                      alt={item.product.title}
                      style={{ width: 200, height: 150, marginRight: 20 }}
                    />
                    <Typography variant="h6" gutterBottom>
                      {item.product.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Quantity: {item.quantity}
                    </Typography>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="body1"
                        gutterBottom
                        style={{ marginRight: "20px" }}
                      >
                        Price: ${item.product.price}
                      </Typography>
                      <Typography
                        variant="body1"
                        gutterBottom
                        style={{ marginRight: "20px" }}
                      >
                        Total Price: ${item.product.price * item.quantity}
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          dispatch(decreaseQuantity(item.product.id))
                        }
                        style={{ marginRight: "10px" }}
                      >
                        -
                      </Button>
                      <Typography variant="body2" style={{ margin: "0 6%" }}>
                        {item.quantity}
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          dispatch(increaseQuantity(item.product.id))
                        }
                        style={{ marginRight: "10px" }}
                      >
                        +
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => dispatch(removeFromCart(item.product.id))}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  </CardContent>
                </Paper>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Divider />
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  flexDirection: "column",
                  marginTop: "10px",
                }}
              >
                <Typography variant="h6">
                  Total Quantity: {totalQuantity}
                </Typography>
                <Typography variant="h6">
                  Grand Total: ${totalPrice}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default MyCart;

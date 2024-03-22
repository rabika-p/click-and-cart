"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";

import { useLoginMutation } from "../../services/usersApi";
import { showToast } from "../../components/login/Toast";
import { loginSuccess } from "../../features/usersSlice";
import FormLayout from "../../layouts/layout";

const theme = createTheme();

const LogoImg = styled("img")({
  maxWidth: "100%",
  height: "auto",
  marginBottom: "20px",
});

export default function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const [loginMutation, { isLoading, isError }] = useLoginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to check admin credentials (to assign this user as admin for the site)
  const checkAdminCredentials = (username, password) => {
    if (username === "kminchelle" && password === "0lelplR") {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await loginMutation(JSON.stringify(formData));
      if (result.data) {
        const { token } = result.data;
        const { username, password } = formData;
        const isAdmin = checkAdminCredentials(username, password);
        dispatch(loginSuccess({ token, isAdmin, username }));
        showToast("Login successful!", "success");
        router.push("/products");
      } else {
        showToast("Login failed. Please try again.", "error");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormLayout>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              padding: "40px",
              backgroundColor: "white",
            }}
          >
            <LogoImg src="/assets/logo.png" className="max-h-10" />
            <Typography
              component="h1"
              variant="h5"
              sx={{ marginBottom: "20px" }}
            >
              Hi, Welcome Back
            </Typography>
            <Typography
              component="h2"
              variant="subtitle1"
              sx={{ marginBottom: "20px" }}
            >
              Enter your credentials to continue
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ width: "100%" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleChange}
                    sx={{ backgroundColor: "#f8fafc" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    sx={{ backgroundColor: "#f8fafc" }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  backgroundColor: "#647cf4",
                  "&:hover": {
                    backgroundColor: "#4e50cd",
                  },
                  marginTop: "7%",
                }}
              >
                Continue
              </Button>
            </Box>
          </Box>
        </Container>
      </FormLayout>
    </ThemeProvider>
  );
}

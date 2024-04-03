"use client";

import { useSelector } from "react-redux";

import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Divider,
  Paper,
} from "@mui/material";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';

import { selectUsername } from "@/features/usersSlice";
import AuthLayout from "@/layouts/authLayout";
import withAuth from "@/hoc/withAuth";

const UserProfile = () => {
  const username = useSelector(selectUsername);

  const { firstName, lastName, gender, email, image } = useSelector(
    (state) => state.users.otherDetails
  );

  return (
    <AuthLayout>
      <Card sx={{ maxWidth: 800, margin: "auto", mt: 4, borderRadius: 10 }}>
        <CardContent sx={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <Avatar
              alt={firstName}
              src={image}
              sx={{ width: 150, height: 150, margin: "auto", marginBottom: 2 }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              {firstName + " " + lastName}
            </Typography>
          </div>
        </CardContent>
        <Divider />
        <CardContent>
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#FBFCFD",
                  padding: 2,
                  borderRadius: 5,
                  width: "60%",
                }}
              >
                <BadgeOutlinedIcon sx={{ marginRight: 1 }} />
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Username:
                </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ margin: "0 10px" }}
                />
                <Typography variant="body1">{username}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#FBFCFD",
                  padding: 2,
                  borderRadius: 5,
                  width: "60%",
                }}
              >
                <EmailOutlinedIcon sx={{ marginRight: 1 }} />
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Email:
                </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ margin: "0 10px" }}
                />
                <Typography variant="body1">{email}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#FBFCFD",
                  padding: 2,
                  borderRadius: 5,
                  width: "60%",
                }}
              >
                <ContactsOutlinedIcon sx={{ marginRight: 1 }} />
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Gender:
                </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ margin: "0 10px" }}
                />
                <Typography variant="body1">{gender}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default withAuth(UserProfile);

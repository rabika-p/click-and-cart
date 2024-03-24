import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { selectUserId } from "@/features/usersSlice";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

export const BlogCard = (props) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const { blog, handleDelete } = props;

  const userId = useSelector(selectUserId);

  const router = useRouter();
  const pathname = usePathname();

  console.log(router, pathname);

  const handleEdit = () => {
    router.push(`/edit-blog/${blog.id}`);
  };

  const truncateDescription = (description) => {
    return description.length > 50
      ? description.slice(0, 50) + "..."
      : description;
  };

  const renderActions = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
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
            onClick={() => handleDelete(blog.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    );
  };

  return (
    <Card
      onMouseEnter={() => setIsButtonVisible(true)}
      onMouseLeave={() => setIsButtonVisible(false)}
      style={{ position: "relative", height: "100%" }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pb: 3,
          height: "100%",
        }}
      >
        <div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: 3,
            }}
          >
            <img
              className="h-48 object-fill"
              src={
                blog.thumbnail ? blog.thumbnail : "/assets/blog-thumbnail.jpg"
              }
              alt="Blog Image"
            />
          </Box>

          <Typography
            align="center"
            gutterBottom
            variant="h5"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {blog.title}
          </Typography>

          <Typography
            align="justify"
            variant="body1"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 3,
            }}
          >
            {blog.body}
          </Typography>
        </div>
        {pathname === "/my-posts" && blog.userId === userId && (
          <>
            <Divider sx={{ mt: 2 }} />
            <Box sx={{ pt: 1, px: 2, textAlign: "center" }}>
              {pathname === "/my-posts" && blog.userId === userId
                ? renderActions()
                : null}
            </Box>
          </>
        )}
      </CardContent>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: pathname === "/my-posts" ? 70 : 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.8,
          pointerEvents: "none",
          ...(isButtonVisible && {
            backgroundColor: "#F5F5F5",
          }),
        }}
      >
        {isButtonVisible && (
          <button
            className="viewMoreButton"
            style={{
              zIndex: isButtonVisible ? 1 : 2,
              color: "black",
              pointerEvents: "auto",
            }}
          >
            <VisibilityIcon />
          </button>
        )}
      </div>
    </Card>
  );
};

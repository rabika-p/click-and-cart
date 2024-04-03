import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Paper
          key={comment.id}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Avatar src="/assets/avatar-2.png" />
          <Box sx={{ ml: 1 }}>
            <Typography variant="subtitle2">{comment.user.username}</Typography>
          </Box>
          <Box sx={{ mx: 1 }}>
            <Typography>{comment.body}</Typography>
          </Box>
        </Paper>
      ))}
    </div>
  );
};

export default CommentList;

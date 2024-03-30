import { useState } from "react";

import {IconButton, InputBase, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const CommentForm = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() !== "") {
      onSubmit(commentText);
      setCommentText("");
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "60%",
        margin: "auto",
        marginBottom: 2,
      }}
      onSubmit={handleSubmit}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Write your comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <IconButton color="primary" sx={{ p: "10px" }}>
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default CommentForm;

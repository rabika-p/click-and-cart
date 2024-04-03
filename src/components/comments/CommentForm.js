import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconButton, InputBase, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { selectUsername } from "@/features/usersSlice";
import { addComment } from "@/features/commentsSlice";

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() !== "") {
      const newComment = {
        postId: blogId,
        user: {
          username: username,
        },
        body: commentText,
      };
      dispatch(addComment(newComment));
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
      <IconButton color="primary" sx={{ p: "10px" }} onClick={handleSubmit}>
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default CommentForm;

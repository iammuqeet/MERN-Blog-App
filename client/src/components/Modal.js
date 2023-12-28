import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Box, Typography, Button, Modal } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal = ({ isOpen, onClose, blogId }) => {
  const [redirectToHome, setRedirectToHome] = useState(false);

  const deleteBlog = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_REQUEST_URL}/blog/delete/${blogId}`, // Fix the route by removing :id and adding the actual blogId
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.status === 200) {
        alert("Blog deleted successfully");
        onClose(); // Call onClose to close the modal
        setRedirectToHome(true);
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog", error);
      // Handle error scenario
    }
  };
  if (redirectToHome) return <Navigate to="/" />;
  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to delete this blog?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ m: 2 }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ m: 2 }}
          onClick={deleteBlog}
        >
          <DeleteForeverIcon />
          Delete Post
        </Button>
      </Box>
    </Modal>
  );
};

export default BasicModal;

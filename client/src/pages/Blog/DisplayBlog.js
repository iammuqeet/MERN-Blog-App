// DisplayBlog.js
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import moment from "moment"; // Import the moment library
import BasicModal from "../../components/Modal";

import {
  Avatar,
  Box,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Container,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { UserContext } from "../../UserContext";

const DisplayBlog = () => {
  const [blogData, setBlogData] = useState(null);
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_REQUEST_URL}/blog/${id}`)
      .then((response) => response.json())
      .then((data) => setBlogData(data));
  }, []);

  if (!blogData) return null;

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        {blogData.title}
      </Typography>

      <Card>
        <CardMedia
          component="img"
          height="auto"
          image={process.env.REACT_APP_REQUEST_URL + "/" + blogData.file}
          alt="Blog Image"
        />

        <CardContent>
          <Typography variant="body1" paragraph>
            {blogData.description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            By{" "}
            <strong>
              {blogData.author.firstName} {blogData.author.lastName}
            </strong>{" "}
            - {moment(blogData.createdAt).format("ll")}
          </Typography>
          <Box my={2}>
            <Button variant="contained">
              <EditIcon />
              Edit Blog
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={{ marginLeft: "10px" }}
              onClick={handleDelete}
            >
              <DeleteForeverIcon />
              Delete Post
            </Button>
          </Box>

          <Typography
            variant="body1"
            paragraph
            dangerouslySetInnerHTML={{ __html: blogData.content }}
          />
        </CardContent>
      </Card>

      <BasicModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        blogId={id}
      />
    </Container>
  );
};

export default DisplayBlog;

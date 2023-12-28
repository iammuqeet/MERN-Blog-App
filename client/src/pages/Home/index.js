import React, { useEffect, useState } from "react";
import Blog from "../../components/Blog/";

import { Box, Grid } from "@mui/material";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3002/blogs").then((response) => {
      response.json().then((blogs) => {
        setBlogs(blogs);
      });
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }} m={5}>
      <Grid container spacing={2}>
        {blogs.map((blog) => (
          <Grid item key={blog.id} xs={12} sm={6} md={4}>
            <Blog blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;

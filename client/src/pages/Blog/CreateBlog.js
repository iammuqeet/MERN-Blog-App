import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleFileChange = (e) => {
    // Handle file input change
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSaveBlog = async () => {
    const data = new FormData();
    data.set("title", title);
    data.set("description", description);
    data.set("content", content);
    data.set("file", file);

    const response = await fetch(
      `${process.env.REACT_APP_REQUEST_URL}/blog/create`,
      {
        method: "POST",
        body: data,
        credentials: "include",
      }
    );

    if (response.ok) {
      setRedirectToHome(true);
    }
  };

  if (redirectToHome) return <Navigate to="/" />;
  return (
    <div style={{ maxWidth: "80%", margin: "auto" }}>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h1>Create Blog</h1>
      </div>
      <FormControl fullWidth>
        <TextField
          label="Heading"
          variant="outlined"
          placeholder="Enter the heading for the blog"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          variant="outlined"
          placeholder="Enter the description for the blog"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <OutlinedInput
          id="file-input"
          type="file"
          onChange={handleFileChange}
          sx={{ mb: 2 }}
        />
        <ReactQuill
          theme="snow"
          placeholder="Enter the content for the blog"
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, 4, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
          }}
          onChange={(content) => setContent(content)}
          style={{ height: "300px", marginBottom: "1rem" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveBlog}
          sx={{ mt: 10 }}
        >
          Save Blog
        </Button>
      </FormControl>
    </div>
  );
};

export default CreateBlog;

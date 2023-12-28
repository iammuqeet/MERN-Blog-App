import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
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
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

import { ExpandMore } from "../../pages/Home/helper";

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false);
  console.log(blog);
  const { _id, title, description, file, content, createdAt, author } = blog;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const formattedDate = new Date(author?.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  );

  const concatName = author?.firstName + " " + author?.lastName;

  return (
    <Card>
      <Link to={`/blog/${_id}`}>
        <CardMedia
          component="img"
          height="194"
          image={process.env.REACT_APP_REQUEST_URL + "/" + file}
          alt="Robotics"
        />
      </Link>
      <CardHeader title={title} />
      <CardContent>
        <Box display="flex" flexDirection="row">
          <Typography variant="body2" color="text.secondary">
            <strong>{concatName}</strong>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginLeft: 1 }}
          >
            - {moment(createdAt).format("ll")}
          </Typography>
        </Box>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Blog;

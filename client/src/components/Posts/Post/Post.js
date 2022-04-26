import React, {useState} from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deletePost, likePost } from "../../../actions/posts";

import useStyles from "./styles";
import posts from "../../../reducers/posts";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleLikes = async () => {
     dispatch(likePost(post._id));

     if(likes.find((like) => like === (user?.result?.googleId || user?.result?._id))){
       setLikes(likes.filter((id) => id !== (user?.result?.googleId || user?.result?._id)))
      }
      else{
        setLikes([...likes, user?.result?.googleId || user?.result?._id  ])
      }
  };

  const Likes = () => {
    const user = JSON.parse(localStorage.getItem("profile"));

    if (likes.length > 0) {
      return likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpOffAltOutlinedIcon fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpOffAltOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia className={classes.media} image={post.selectedFile} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        </ButtonBase>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => setCurrentId(post._id)}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          sixe="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLikes}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            sixe="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;

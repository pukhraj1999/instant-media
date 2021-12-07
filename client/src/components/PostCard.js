import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
//To fix date
import moment from "moment";

const useStyle = makeStyles({
  card: {
    position: "relative",
    borderRadius: "20px",
  },
  overlay: {
    position: "absolute",
    top: "140px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "10px",
    right: "5px",
    color: "white",
  },
});

//Handling user sign in sign out----
const user = JSON.parse(localStorage.getItem("profile"));

//----

function PostCard({
  name,
  postTitile,
  postImg,
  postContent,
  postTags,
  postLikes,
  postDate,
  update,
  Delete,
  like,
}) {
  const classes = useStyle();
  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia style={{ height: "200px" }} image={postImg} />
          <div className={classes.overlay}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body2">
              {moment(postDate).fromNow()}
            </Typography>
          </div>
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={update}
              disabled={
                user === null || user.result.name !== name ? true : false
              }
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
          <CardContent>
            <Typography variant="h5" component="h2">
              {postTitile}
            </Typography>
            <Typography
              gutterBottom
              variant="caption"
              component="p"
              color="primary"
            >
              {postTags}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {postContent}
            </Typography>
          </CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              style={{
                margin: "5px",
              }}
              color="primary"
              size="small"
              onClick={like}
              disabled={user === null ? true : false}
            >
              {postLikes > 0 ? <ThumbUpAltIcon /> : <ThumbUpAltOutlined />}
              Like {postLikes}
            </Button>
            <Button
              style={{ margin: "5px" }}
              size="small"
              color="secondary"
              onClick={Delete}
              disabled={
                user === null || user.result.name !== name ? true : false
              }
            >
              <DeleteIcon />
              Delete
            </Button>
          </div>
        </Card>
      </Grid>
    </>
  );
}

export default PostCard;

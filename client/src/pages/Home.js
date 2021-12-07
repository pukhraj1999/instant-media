import React, { useEffect } from "react";
import { useHistory } from "react-router";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import PostCard from "../components/PostCard";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPosts, likePost } from "../actions/posts";

function Home() {
  //For updating
  const history = useHistory();
  //Redux----
  const dispatch = useDispatch();
  const posts = useSelector((select) => select.posts);

  console.log(posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  //----

  return (
    <>
      <Typography align="center" variant="h2" color="textSecondary">
        Recent Posts
      </Typography>
      <Container maxWidth="lg">
        {!posts.length ? (
          <div
            style={{
              margin: "18% auto",
              textAlign: "center",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Grid container justifyContent="space-between" spacing={2}>
            {posts.map((post) => (
              <PostCard
                key={post._id}
                name={post.name}
                postTitile={post.title}
                postImg={post.selectedFile}
                postContent={post.content}
                postTags={post.tags.map((item) => "#" + item + " ")}
                postLikes={post.likes ? post.likes.length : 0}
                postDate={post.createdAt}
                update={() => history.push(`/update/${post._id}`)}
                Delete={() => dispatch(deletePost(post._id))}
                like={() => dispatch(likePost(post._id))}
              />
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

export default Home;

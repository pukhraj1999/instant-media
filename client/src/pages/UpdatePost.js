import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import FileBase from "react-file-base64";
import {
  FormControl,
  Container,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

import { grey } from "@material-ui/core/colors";
import MyTextField from "../components/MyTextField";
import MyTextArea from "../components/MyTextArea";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { updatePost } from "../actions/posts";

const useStyles = makeStyles({
  fileStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10px",
    marginBottom: "10px",
    padding: "15px",
    color: "white",
    backgroundColor: grey[500],
    borderRadius: "5px",
  },
});

function UpdatePost() {
  const classes = useStyles();
  const [post, setPost] = useState({
    title: "",
    content: "",
    tags: "",
    selectedFile: "",
  });

  //For updating
  const { id } = useParams();

  //Redux
  // ------
  const dispatch = useDispatch();
  //To find specific post in posts array
  const curPost = useSelector((select) =>
    id ? select.posts.find((post) => post._id === id) : null
  );

  useEffect(() => {
    if (curPost) setPost(curPost);
  }, [curPost]);

  //-------
  function handleOnChange(e) {
    const { name, value } = e.target;
    setPost((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function sendData(e) {
    e.preventDefault();
    dispatch(updatePost(id, post));
    alert("SuccessFully Posted!!");
  }

  function Clear(e) {
    setPost({ title: "", content: "", tags: "", selectedFile: "" });
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h2" align="center">
        Welcome
      </Typography>
      <Typography variant="h3" color="textSecondary" align="center">
        Update your Post:-
      </Typography>
      <Container maxWidth="md">
        <form action="" autoComplete="off" onSubmit={sendData}>
          <FormControl fullWidth>
            <MyTextField
              onChange={handleOnChange}
              name="title"
              value={post.title}
              label="Title"
              placeholder="Title"
            />
            <MyTextArea
              onChange={handleOnChange}
              name="content"
              value={post.content}
              label="Description"
              placeholder="Description"
            />
            <div className={classes.fileStyle}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPost({ ...post, selectedFile: base64 })
                }
              />
            </div>
            <MyTextField
              onChange={(e) =>
                setPost({ ...post, tags: e.target.value.split(",") })
              }
              name="tags"
              value={post.tags}
              label="Tags"
              placeholder="Tags"
            />
            <Button type="submit" variant="contained" color="secondary">
              Submit
            </Button>
            <Button
              onClick={Clear}
              variant="contained"
              style={{ backgroundColor: grey, marginTop: "10px" }}
            >
              Clear
            </Button>
          </FormControl>
        </form>
      </Container>
    </Container>
  );
}

export default UpdatePost;

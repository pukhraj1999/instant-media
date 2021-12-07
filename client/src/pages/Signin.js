import { FormControl, Typography, Container, Button } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import MyTextField from "../components/MyTextField";
import { useState } from "react";
import { useHistory } from "react-router-dom";

//Redux---

import { useDispatch } from "react-redux";
import { signin } from "../actions/auth";

//---

function Signin() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  //Redux---
  const dispatch = useDispatch();
  const history = useHistory();
  //---

  function handleOnChange(e) {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  const sendData = async (e) => {
    e.preventDefault();
    await dispatch(signin(data, history));
    alert("Successfully Signin!!!");
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h2" align="center">
          Welcome
        </Typography>
        <Typography variant="h3" color="textSecondary" align="center">
          Sign in:-
        </Typography>
        <form action="" autoComplete="off" onSubmit={sendData}>
          <FormControl fullWidth>
            <MyTextField
              type="email"
              label="Email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              placeholder="test@gmail.com"
            />
            <MyTextField
              type="password"
              label="Password"
              name="password"
              value={data.password}
              onChange={handleOnChange}
              placeholder="Password"
            />
            <Button type="submit" variant="contained" color="secondary">
              Sign in
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: grey, marginTop: "10px" }}
            >
              Clear
            </Button>
          </FormControl>
        </form>
      </Container>
    </>
  );
}

export default Signin;

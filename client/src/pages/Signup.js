import { FormControl, Typography, Container, Button } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import MyTextField from "../components/MyTextField";
import { useState } from "react";
import { useHistory } from "react-router-dom";

//Redux---

import { useDispatch } from "react-redux";
import { signup } from "../actions/auth";

//---

function Signup() {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirm_Passwd: "",
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

  function sendData(e) {
    e.preventDefault();
    dispatch(signup(data, history));
    alert("Successfully Signup!!!");
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h2" align="center">
          Welcome
        </Typography>
        <Typography variant="h3" color="textSecondary" align="center">
          Sign up:-
        </Typography>
        <form action="" autoComplete="off" onSubmit={sendData}>
          <FormControl fullWidth>
            <MyTextField
              type="text"
              label="First Name"
              name="fname"
              value={data.fname}
              onChange={handleOnChange}
              placeholder="First Name"
            />
            <MyTextField
              type="text"
              label="Last Name"
              name="lname"
              value={data.lname}
              onChange={handleOnChange}
              placeholder="Last Name"
            />
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
            <MyTextField
              type="password"
              label="Confirm Password"
              name="confirm_Passwd"
              value={data.confirm_Passwd}
              onChange={handleOnChange}
              placeholder="Confirm Password"
            />
            <Button type="submit" variant="contained" color="secondary">
              Sign up
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

export default Signup;

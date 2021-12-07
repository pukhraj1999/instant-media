import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Signout from "./pages/Signout";
import UpdatePost from "./pages/UpdatePost";

function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/create" component={CreatePost} />
          <Route exact path="/update/:id" component={UpdatePost} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signout" component={Signout} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;

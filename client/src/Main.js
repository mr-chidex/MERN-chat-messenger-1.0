import React from "react";
import { Route, Switch } from "react-router-dom";
import Chat from "./pages/Chat";
import JoinGroup from "./pages/JoinGroup";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const Main = () => {
  return (
    <>
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/join" component={JoinGroup} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </>
  );
};

export default Main;

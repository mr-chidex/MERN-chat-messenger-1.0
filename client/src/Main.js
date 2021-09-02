import React from "react";
import { Route, Switch } from "react-router-dom";
import io from "socket.io-client";

import Chat from "./pages/Chat";
import JoinGroup from "./pages/JoinGroup";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const socket = io.connect(process.env.REACT_APP_BASE_URL);

const Main = () => {
  return (
    <>
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/join">
          <JoinGroup socket={socket} />
        </Route>
        <Route path="/chat/:groupId">
          <Chat socket={socket} />
        </Route>
      </Switch>
    </>
  );
};

export default Main;

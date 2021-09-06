import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import io from "socket.io-client";
import { useSelector } from "react-redux";

import Chat from "./pages/Chat";
import JoinGroup from "./pages/JoinGroup";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const socket = io.connect(process.env.REACT_APP_BASE_URL);

const Main = () => {
  const { user } = useSelector((state) => state.loginUser);

  return (
    <>
      <Switch>
        {!user && <Route path="/signin" component={Signin} />}

        {!user && <Route path="/signup" component={Signup} />}

        {user && (
          <Route path="/join">
            <JoinGroup socket={socket} />
          </Route>
        )}

        {user && (
          <Route path="/chat/:groupId">
            <Chat socket={socket} />
          </Route>
        )}

        {user && <Redirect to="/join" />}

        {!user && <Redirect from="/" to="/signin" />}
      </Switch>
    </>
  );
};

export default Main;

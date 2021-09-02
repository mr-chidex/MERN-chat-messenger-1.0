import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Alerts from "../components/Alerts";
import { userSigninAction } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: "#3f51b5",
    textDecoration: "none",
  },
}));

function Copyright() {
  const classes = useStyles();

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <a
        className={classes.link}
        rel="noreferrer noopener"
        target="_blank"
        href="https://github.com/mr-chidex"
      >
        mr-chidex
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Signin = () => {
  const classes = useStyles();
  const [emailUsername, setEmailUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alerts, setAlerts] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();
  const { loading, message, error, user } = useSelector(
    (state) => state.loginUser
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user?._id) {
      history.push("/join");
    }
  }, [history, user]);

  const signinHandler = (e) => {
    e.preventDefault();

    const user = { emailUsername, password };

    dispatch(userSigninAction(user));
    setAlerts(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          {alerts && error && (
            <Alerts message={message} type={error && "danger"} />
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="emailUsername"
            label="Email Address or User Name"
            name="emailUsername"
            autoFocus
            onChange={(e) => setEmailUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {loading ? (
            <Button
              variant="contained"
              fullWidth
              disabled
              className={classes.submit}
            >
              Sign In...
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={signinHandler}
            >
              Sign In
            </Button>
          )}
          <Grid container>
            <Grid item xs>
              <Link to="#" className={classes.link}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link className={classes.link} to="/signup">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Signin;

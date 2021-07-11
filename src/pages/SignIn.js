import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Logo from "../components/Logo";
import GoogleButton from "react-google-button";
import { auth, googleProvider } from "./../firebase/index";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import SnackbarComponent from "../components/Snackbar";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signInWithGoogle } = useAuth();
  const [alertState, setAlertState] = React.useState({
    open: false,
    message: "",
    type: "error",
  });
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      props.history.push("/");
    } catch (error) {
      // setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
      setAlertState({
        ...alertState,
        open: true,
        message: error.message,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const googleResponse = await auth.signInWithPopup(googleProvider);
      await signInWithGoogle(googleResponse.user);
      props.history.push("/");
    } catch (error) {
      console.error("Error google signin", error);
      setAlertState({
        ...alertState,
        open: true,
        message: error.message,
        type: "warning",
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertState({
      ...alertState,
      open: false,
      message: "",
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Logo />
        <SnackbarComponent
          open={alertState.open}
          handleClose={handleClose}
          message={alertState.message}
          type={alertState.type}
        />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box p={1} m={1} width="100%">
          <GoogleButton
            onClick={handleGoogleSignIn}
            style={{
              width: "100%",
            }}
          />
        </Box>
        <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="userEmail"
            autoComplete="email"
            autoFocus
            onChange={onChangeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="userPassword"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChangeHandler}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link
                to="/forgot-password"
                style={{
                  textDecoration: "none",
                  color: "#4285F4",
                }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  color: "#4285F4",
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

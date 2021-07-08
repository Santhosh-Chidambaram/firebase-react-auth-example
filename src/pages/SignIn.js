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
import { auth, signInWithGoogle } from "./../firebase/index";
import Divider from "@material-ui/core/Divider";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

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
  const { login, currentUser } = useAuth();

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
    console.log(email, password);
    try {
      const result = await login(email, password);
      console.log("Login", result);
      props.history.replace("/");
    } catch (error) {
      // setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      props.history.replace("/");
    } catch (error) {
      console.error("Error google signin", error);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Logo />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
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
            type="submit"
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

          <Divider style={{ margin: "15px 0px" }} />

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            p={1}
            m={1}
          >
            <GoogleButton onClick={handleGoogleSignIn} />
          </Box>
        </form>
      </div>
    </Container>
  );
}

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuth } from "../context/AuthContext";
import {  Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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

export default function ForgotPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await resetPassword(email);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Password Reset Link has been sent to your email
          </Alert>
        </Snackbar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <div></div>
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
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send me a reset link
          </Button>

          <Grid container>
            <Grid item>
              <Link
                to="/signin"
                style={{
                  textDecoration: "none",
                  color: "#4285F4",
                }}
              >
                Back to sign in page
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

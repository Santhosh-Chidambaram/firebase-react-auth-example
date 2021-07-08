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
import { useAuth } from "../context/AuthContext";
import { useHistory, Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { auth } from "../firebase";

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

export default function PasswordReset(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const { resetPassword, login } = useAuth();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [passwordForm, setPasswordForm] = React.useState({
    password: "",
    repeatPassword: "",
  });

  //Query String Handler
  const { search } = useLocation();
  const queryValues = queryString.parse(search);
  const { mode, oobCode, continueUrl, lang = "en" } = queryValues;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    auth
      .verifyPasswordResetCode(oobCode)
      .then(async (email) => {
        await auth.confirmPasswordReset(oobCode, passwordForm.password);
        setOpen(true);
        await login(email, passwordForm.password);
        history.push("/");
      })
      .catch((error) => {
        console.log("password verfication error");
      });
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Your Password has been resetted successfully.
          </Alert>
        </Snackbar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <div></div>
        <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChangeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="repeatPassword"
            label="Repeat Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChangeHandler}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save Password
          </Button>
        </form>
      </div>
    </Container>
  );
}

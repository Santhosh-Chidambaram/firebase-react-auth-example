import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { auth } from "../firebase";
import SnackbarComponent from "./../components/Snackbar";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
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
  const { login } = useAuth();
  const history = useHistory();
  const [alertState, setAlertState] = React.useState({
    open: false,
    message: "",
    type: "success",
  });
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
        setAlertState({
          ...alertState,
          open: true,
          message: "Your Password has been resetted successfully",
          type: "success",
        });
        await login(email, passwordForm.password);
        setTimeout(() => {
          history.push("/");
        }, 3000);
      })
      .catch((error) => {
        console.log("password verfication error");
        setAlertState({
          ...alertState,
          open: true,
          message: error.message,
          type: "error",
        });
      });
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
        <SnackbarComponent
          open={alertState.open}
          handleClose={handleClose}
          message={alertState.message}
          type={alertState.type}
        />
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
            label="Enter New Password"
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

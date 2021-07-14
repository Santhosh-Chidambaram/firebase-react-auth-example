import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function MaterialAlert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarComponent = ({
  open,
  message,
  handleClose,
  duration = 3000,
  type = "error",
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      <MaterialAlert onClose={handleClose} severity={type}>
        {message}
      </MaterialAlert>
    </Snackbar>
  );
};

export default SnackbarComponent;

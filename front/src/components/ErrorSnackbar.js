import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from "@material-ui/lab/Alert";

const ErrorSnackbar = ({error, setError}) => {

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError("");
  };

  return (
        <Snackbar
          open={"" !== error}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <MuiAlert onClose={handleClose} severity="error">
            {error}
          </MuiAlert>
        </Snackbar>
  )
}

export default ErrorSnackbar

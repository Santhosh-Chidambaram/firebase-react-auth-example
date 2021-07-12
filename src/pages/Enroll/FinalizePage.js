import Container from "@material-ui/core/Container";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useEnrollStyles } from "./styles";

const FinalizePage = () => {
  const classes = useEnrollStyles();
  return (
    <Container className={classes.root}>
      <Grid container lg={10} direction="row" justifyContent="center">
        <Grid item className={classes.header} xs={11}>
          <Typography className={classes.heading} variant="h3" component="h4">
            You are all set.
          </Typography>
        </Grid>
        <Grid
          item
          xs={11}
          style={{
            paddingTop: 40,
          }}
        >
          <Typography
            className={classes.captionText}
            variant="h6"
            component="h6"
          >
            We will review the rosters and upload in the database. You will get
            an email confirmation in the next 2 days.
          </Typography>
          <Typography
            className={classes.captionText}
            variant="h6"
            component="h6"
          >
            You can start uploading photos now
          </Typography>
        </Grid>
        <Grid item xs={11} className={classes.footer}>
          <div>
            <Button color="primary" className={classes.transparentButton}>
              Continue
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FinalizePage;

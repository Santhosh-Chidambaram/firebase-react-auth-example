import Container from "@material-ui/core/Container";
import React, { useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useEnrollStyles } from "./styles";
import { EnrollContext } from "./index";
import Button from "@material-ui/core/Button";
import { useEnrollContext } from "../../context/EnrollContext";
const TeacherRoaster = () => {
  const classes = useEnrollStyles();
  const { handleSetForm, enrollmentForm, handleTRContinue } =
    useEnrollContext();
  const inputRef = useRef();

  const handleUploadBtnClick = (event) => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleRoasterUpload = (event) => {
    event.preventDefault();
    if (inputRef && inputRef.current && event.target.files[0]) {
      console.log(event.target.files[0]);
      handleSetForm({
        name: "teacherRoster",
        value: event.target.files[0],
      });
    }
  };
  return (
    <Container className={classes.root}>
      <Grid md={8} lg={8}>
        <Grid item className={classes.header}>
          <Typography className={classes.heading} variant="h3" component="h4">
            Upload Teacher Roster
          </Typography>
        </Grid>

        <Grid container xs={12}>
          <Typography
            className={classes.caption}
            variant="body1"
            component="h6"
          >
            You can upload any file format (eg: xls, csv, pdf). Or, if you dont
            have an electronic copy, just upload a legible photo of the sign in
            sheet of the class. We will work something out on our end.
          </Typography>
          <Grid item className={classes.uploadBtnWrapper} xs={12}>
            <div>
              <input
                accept=".pdf,.xls,.csv,.doc,.docx,.png,.jpg"
                style={{ display: "none" }}
                id="teacher-roaster-file"
                type="file"
                ref={inputRef}
                onChange={handleRoasterUpload}
              />
              <Typography
                className={classes.uploadFile}
                variant="h6"
                component="h6"
              >
                {enrollmentForm?.teacherRoster?.name}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.uploadButton}
                onClick={handleUploadBtnClick}
              >
                Upload Teacher Roster
              </Button>
            </div>
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.footer}>
          <div style={{ display: "inline-block" }}>
            <Button
              color="primary"
              className={classes.transparentButton}
              onClick={handleTRContinue}
            >
              Continue
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeacherRoaster;

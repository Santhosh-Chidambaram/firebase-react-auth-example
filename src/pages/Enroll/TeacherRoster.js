import Container from "@material-ui/core/Container";
import React, { useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useEnrollStyles } from "./styles";
import { Button } from "@material-ui/core";
import { EnrollContext } from "./index";

const TeacherRoaster = () => {
  const classes = useEnrollStyles();
  const { handleSetForm, enrollmentForm } = React.useContext(EnrollContext);
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
        name: "teacher_roaster",
        value: event.target.files[0],
      });
    }
  };
  return (
    <Container className={classes.root}>
      <Grid container lg={10}>
        <Grid item className={classes.header}>
          <Typography className={classes.heading} variant="h3" component="h4">
            Upload Teacher Roaster
          </Typography>
        </Grid>

        <Grid container xs={12} sm={10}>
          <Typography className={classes.caption} variant="h6" component="h6">
            You can upload any file format (eg: xls, csv, pdf). Or, if you dont
            have an electronic copy, just upload a legible photo of the sign in
            sheet of the class. We will work something out on our end.
          </Typography>
          <Grid item className={classes.uploadBtnWrapper}>
            <input
              accept=".pdf,.xls,.csv,.doc,.docx,"
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
              {enrollmentForm?.teacher_roaster?.name}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.uploadButton}
              onClick={handleUploadBtnClick}
            >
              Upload
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={10}>
          <Typography className={classes.caption} variant="h6" component="h6">
            On completion of upload, transition to next screen
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeacherRoaster;

import Container from "@material-ui/core/Container";
import React, { useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useEnrollStyles } from "./styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { EnrollContext } from "./index";
import BackButton from "../../components/BackButton";
import { useEnrollContext } from "../../context/EnrollContext";

const UploadRoasterRow = ({ rosterItem, updateStudentRoaster }) => {
  const classes = useEnrollStyles();
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
      updateStudentRoaster({
        ...rosterItem,
        rosterFile: event.target.files[0],
      });
    }
  };
  return (
    <Grid container className={classes.rowContainer} xs={12}>
      <Grid item className={classes.rowItem} xs={12}>
        <div
          style={{
            display: "inline-block",
          }}
        >
          <TextField
            style={{
              marginRight: "20px",
              minWidth: 181,
            }}
            id="standard-basic"
            label="Enter Class Name"
            value={rosterItem.className}
            onChange={(event) => {
              updateStudentRoaster({
                ...rosterItem,
                className: event.target.value,
              });
            }}
          />
        </div>
      </Grid>
      <Grid item className={classes.rowItem} xs={12}>
        <div
          style={{
            display: "inline-block",
          }}
        >
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
            {rosterItem?.rosterFile?.name}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.uploadButton}
            onClick={handleUploadBtnClick}
          >
            Upload Student Roster
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

const StudentRoster = () => {
  const classes = useEnrollStyles();

  const {
    updateStudentRoaster,
    enrollmentForm,
    handleAddClass,
    handleSRContinue,
  } = useEnrollContext();

  return (
    <Container className={classes.root}>
      <Grid container lg={10}>
        <Grid item className={classes.header}>
          <Typography className={classes.heading} variant="h3" component="h4">
            Upload Student Roster
          </Typography>
        </Grid>

        <Grid container xs={12}>
          <Typography className={classes.caption} variant="h6" component="h6">
            You can upload any file format (eg: xls, csv, pdf). Or, if you dont
            have an electronic copy, just upload a legible photo of the sign in
            sheet of the class. We will work something out on our end.
          </Typography>
          <Grid container style={{ marginTop: 20 }}>
            {enrollmentForm.studentRoster &&
              enrollmentForm.studentRoster.map((item, index) => {
                return (
                  <UploadRoasterRow
                    rosterItem={item}
                    updateStudentRoaster={updateStudentRoaster}
                  />
                );
              })}
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.footer}>
          <div>
            <Button
              color="primary"
              className={classes.transparentButton}
              style={{
                marginRight: 10,
                borderRadius: 20,
              }}
              onClick={() => handleAddClass()}
            >
              Add Class
            </Button>

            <Button
              color="primary"
              className={classes.transparentButton}
              onClick={handleSRContinue}
            >
              Continue
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentRoster;

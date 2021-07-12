import Container from "@material-ui/core/Container";
import React, { useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useEnrollStyles } from "./styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { EnrollContext } from "./index";

const UploadRoasterRow = ({ roasterItem, updateStudentRoaster }) => {
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
        ...roasterItem,
        roasterFile: event.target.files[0],
      });
    }
  };
  return (
    <Grid item className={classes.rowContainer} xs={10}>
      <TextField
        id="standard-basic"
        label="Enter Class Name"
        value={roasterItem.className}
        onChange={(event) => {
          updateStudentRoaster({
            ...roasterItem,
            className: event.target.value,
          });
        }}
      />
      <div>
        <input
          accept=".pdf,.xls,.csv,.doc,.docx,"
          style={{ display: "none" }}
          id="teacher-roaster-file"
          type="file"
          ref={inputRef}
          onChange={handleRoasterUpload}
        />
        <Typography className={classes.uploadFile} variant="h6" component="h6">
          {roasterItem?.roasterFile?.name}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.uploadButton}
          onClick={handleUploadBtnClick}
        >
          Upload
        </Button>
      </div>
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
  } = React.useContext(EnrollContext);

  return (
    <Container className={classes.root}>
      <Grid container container lg={10}>
        <Grid item className={classes.header}>
          <Typography className={classes.heading} variant="h3" component="h4">
            Upload Student Roaster
          </Typography>
        </Grid>

        <Grid container xs={12} sm={10}>
          <Typography className={classes.caption} variant="h6" component="h6">
            You can upload any file format (eg: xls, csv, pdf). Or, if you dont
            have an electronic copy, just upload a legible photo of the sign in
            sheet of the class. We will work something out on our end.
          </Typography>
          <Grid container>
            {enrollmentForm.studentRoaster &&
              enrollmentForm.studentRoaster.map((item, index) => {
                return (
                  <UploadRoasterRow
                    roasterItem={item}
                    updateStudentRoaster={updateStudentRoaster}
                  />
                );
              })}
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.footer}>
          <div>
            <Button
              color="secondary"
              variant="outlined"
              className={classes.transparentButton}
              style={{
                marginRight: 10,
                borderRadius: 20,
              }}
              onClick={() => handleAddClass()}
            >
              Add Class
            </Button>
          </div>
          <div>
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
